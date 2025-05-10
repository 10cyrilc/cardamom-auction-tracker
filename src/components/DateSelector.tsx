import {Calendar} from "lucide-react";
import React from "react";

interface DateSelectorProps {
    dates: string[];
    selectedDate: string | null;
    onDateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({dates, selectedDate, onDateChange}) => (
    <div className="mb-6">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Select Auction Date
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400"/>
            </div>
            <select
                id="date"
                className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md shadow-sm"
                value={selectedDate || ""}
                onChange={onDateChange}
            >
                <option value="getDate">Choose Date</option>
                {dates.map((date, index) => (
                    <option key={`date-${index}`} value={date}>
                        {date}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export default DateSelector