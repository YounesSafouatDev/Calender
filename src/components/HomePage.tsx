import React, { useState, useEffect } from 'react';
import { buttonVariants } from "@/components/ui/button";
import DataPicker from "../Pages/DataPicker";
import WeekHeader from "@/Pages/WeekHeader";
import CalendarView from "@/Pages/CalendarView";

export default function HomePage() {
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());

  // Update the week start date based on local storage
  useEffect(() => {
    const storedDate = localStorage.getItem('currentWeekStartDate');
    if (storedDate) {
      setCurrentWeekStartDate(new Date(storedDate));
    }
  }, []);

  // Save the week start date to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentWeekStartDate', currentWeekStartDate.toISOString());
  }, [currentWeekStartDate]);

  return (
    <div className="flex h-screen gap-6">
      {/* Sidebar */}
      <div className="w-64 flex flex-col">
        {/* Date Picker */}
        <div className="flex-1 w-[270px]">
          {/* Date Picker content goes here */}
          <DataPicker />
        </div>

        {/* Planning Section */}
        <div className="flex-1 bg-blue-700">
          {/* Planning content goes here */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 my-[40px]">
          {/* Header content goes here */}
          <WeekHeader currentWeekStartDate={currentWeekStartDate} setCurrentWeekStartDate={setCurrentWeekStartDate} />
        </div>

        {/* Calendar view */}
        <div className="flex-1">
          {/* Calendar content goes here */}
          <CalendarView currentWeekStartDate={currentWeekStartDate} />
        </div>
      </div>
    </div>
  );
}
