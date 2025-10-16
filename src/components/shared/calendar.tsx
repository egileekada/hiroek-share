"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface Props {
  value?: Date | undefined;
  onSelect?: (d: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showTime?: boolean;
}

export default function SmartCalendar({
  value,
  onSelect,
  placeholder = "Select date",
  label,
  minDate,
  maxDate,
  disabled = false,
  showTime = false,
}: Props) {
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(value);

  const handleDateSelect = (date?: Date) => {
    setInternalValue(date);
    onSelect?.(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!internalValue) return;
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updated = new Date(internalValue);
    updated.setHours(hours);
    updated.setMinutes(minutes);
    setInternalValue(updated);
    onSelect?.(updated);
  };

  const displayLabel = internalValue
    ? showTime
      ? format(internalValue, "PPP p")
      : format(internalValue, "PPP")
    : placeholder;

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {label && <label className="text-sm text-gray-700 font-medium">{label}</label>}

      <div className="rounded-lg flex items-center justify-center border bg-white p-4 shadow-sm">
        <DayPicker
          mode="single"
          selected={internalValue}
          onSelect={handleDateSelect}
          fromDate={minDate}
          toDate={maxDate}
        //   captionLayout="dropdown-buttons"
          showOutsideDays
          disabled={disabled}
        />

        {showTime && (
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <label className="text-sm text-gray-700">Time:</label>
            <input
              type="time"
              onChange={handleTimeChange}
              value={
                internalValue
                  ? `${String(internalValue.getHours()).padStart(2, "0")}:${String(
                      internalValue.getMinutes()
                    ).padStart(2, "0")}`
                  : ""
              }
              className="border rounded px-2 py-1 text-sm"
              disabled={disabled}
            />
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Selected: <span className="font-medium text-gray-800">{displayLabel}</span>
      </div>
    </div>
  );
}

/*
✨ SmartCalendar (Inline Version) ✨
- Inline display (no popup)
- Accessible and mobile-friendly
- Optional time input
- Min/max date limits
- Clean Tailwind styling

Install:
npm i react-day-picker date-fns

Usage:
const [date, setDate] = useState<Date | undefined>();
<SmartCalendar
  label="Select a date"
  value={date}
  onSelect={setDate}
  minDate={new Date()}
  showTime
/>
*/
