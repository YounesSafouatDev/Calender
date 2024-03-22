import React, { useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';

export default function DataPicker() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    useEffect(() => {
        if (date) {
            const formattedDate = date.toISOString();
            localStorage.setItem('currentWeekStartDate', formattedDate);
            console.log(formattedDate);
        }
    }, [date]);

    return (
        <div>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
    );
}
