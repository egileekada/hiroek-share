"use client";

import React from "react"; 
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Props {
  value?: Date;
  onSelect?: (d: Date) => void;
  label?: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec",
];

export default function SmartCalendar({
  value,
  onSelect,
  label,
  minYear = 2000,
  maxYear = new Date().getFullYear() + 5,
  disabled = false,
}: Props) {
  const initialYear = value?.getFullYear() ?? new Date().getFullYear();
  const [year, setYear] = React.useState(initialYear);

  const selectedMonth = value?.getMonth();

  const handleMonthSelect = (monthIndex: number) => {
    if (disabled) return;

    const date = new Date(year, monthIndex, 1);
    onSelect?.(date);
  };

  const canGoPrev = year > minYear;
  const canGoNext = year < maxYear;

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {label && (
        <label className="text-sm text-gray-700 font-medium">
          {label}
        </label>
      )}

      {/* Year Selector */}
      <div className="flex items-center justify-between px-2">
        <button
          type="button"
          disabled={!canGoPrev || disabled}
          onClick={() => setYear((y) => y - 1)}
          className="rounded px-2 py-1 text-sm border disabled:opacity-40"
        >
          <IoChevronBack />
        </button>

        <span className="font-medium text-gray-800">
          {year}
        </span>

        <button
          type="button"
          disabled={!canGoNext || disabled}
          onClick={() => setYear((y) => y + 1)}
          className="rounded px-2 py-1 text-sm border disabled:opacity-40"
        >
          <IoChevronForward />
        </button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 gap-3 rounded-lg border bg-white p-4 shadow-sm">
        {MONTHS.map((month, index) => {
          const isSelected =
            index === selectedMonth &&
            year === value?.getFullYear();

          return (
            <button
              key={month}
              type="button"
              disabled={disabled}
              onClick={() => handleMonthSelect(index)}
              className={`
                rounded-md px-3 py-2 text-sm font-medium transition
                ${
                  isSelected
                    ? "bg-[#37137F] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {month}
            </button>
          );
        })}
      </div>

      {/* Selected Output */}
      {/* {value && (
        <div className="text-sm text-gray-600">
          Selected:{" "}
          <span className="font-medium text-gray-800">
            {format(value, "MMMM yyyy")}
          </span>
        </div>
      )} */}
    </div>
  );
}
