import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const WeekHeader = ({ currentWeekStartDate, setCurrentWeekStartDate }) => {
    const changeWeek = (direction) => {
        const newDate = new Date(currentWeekStartDate);
        if (direction === 'previous') {
            newDate.setDate(newDate.getDate() - 7);
        } else if (direction === 'next') {
            newDate.setDate(newDate.getDate() + 7);
        }
        setCurrentWeekStartDate(newDate);
    };

    // Get the days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekDates = daysOfWeek.map((_, index) => {
        const date = new Date(currentWeekStartDate);
        date.setDate(date.getDate() + index);
        return date;
    });

    return (
        <div className="flex flex-col px-4 py-2">
            {/* Navigation controls */}
            <div className="flex justify-between mb-2">
                <Button variant="outline" size="icon" onClick={() => changeWeek('previous')}>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => changeWeek('next')}>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </div>

            {/* Week display */}
            <div className="flex-1 grid grid-cols-7 justify-items-center ml-[50px]">
                {weekDates.map((date, index) => (
                    <div key={index}>
                        {daysOfWeek[index]} {date.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekHeader;
