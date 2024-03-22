import React, { useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import AppointmentForm from './AppointmentForm';

const CalendarView = ({ currentWeekStartDate }) => {
    const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];
    const [selectedDateTime, setSelectedDateTime] = useState('');

    // Get the date for a specific column in the calendar grid
    const getDayOfWeek = (colIndex) => {
        const date = new Date(currentWeekStartDate);
        date.setDate(date.getDate() + colIndex);
        return date.toISOString().split('T')[0];
    };

    const handleClick = (time, colIndex) => {
        const date = getDayOfWeek(colIndex);
        const formattedTime = time.length === 4 ? `0${time}` : time; // Add leading zero if needed
        setSelectedDateTime(`Date: ${date}, Time: ${formattedTime}`);
        console.log(`Clicked on Date: ${date}, Time: ${formattedTime}`);
    };


    return (
        <div className="flex">
            {/* Time slots */}
            <div className="w-16">
                {times.map((time) => (
                    <div key={time} className="h-12 flex items-center justify-center border-b border-gray-300">
                        {time}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="flex-1 grid grid-cols-7">
                {times.map((time, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {Array.from({ length: 7 }).map((_, colIndex) => (
                            <Drawer key={colIndex} onClose={() => setSelectedDateTime('')}>
                                <DrawerTrigger onClick={() => handleClick(time, colIndex)} className="h-12 border-b border-r border-gray-300 flex items-center justify-center">
                                    {/* You can add content or an icon here */}
                                </DrawerTrigger>
                                <DrawerContent>
                                    <AppointmentForm selectedDateTime={selectedDateTime} onClose={() => setSelectedDateTime('')} />
                                </DrawerContent>
                            </Drawer>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
