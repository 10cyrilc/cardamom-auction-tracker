import {Calendar} from "lucide-react";
import React from "react";

interface DateSelectorProps {
    dates: string[];
    selectedDate: string | null;
    onDateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateSelector = ({dates, selectedDate, onDateChange}: DateSelectorProps) => (
    <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Auction Date
        </label>
        <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10"/>
            <select
                value={selectedDate || ""}
                onChange={onDateChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 hover:shadow-md appearance-none"
            >
                <option value="">Choose Date</option>
                {dates.map((date, index) => (
                    <option key={`date-${index}`} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
            </div>
        </div>
    </div>
);
export default DateSelector