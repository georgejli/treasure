"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import Cancel from "@/components/icons/Cancel";

/**
 * DateFiltering provides a dropdown menu for filtering events based on specific dates.
 * It offers quick selections for 'Today', 'Tomorrow', and 'This Week', as well as a calendar for custom date selection.
 * The selected date range is displayed on the button and can be cleared using a cancel icon.
 *
 * TODO: Refactor to make more DRY
 *
 * State:
 * - date: The currently selected date.
 * - isCalenderOpen: Boolean indicating if the calendar dropdown is open.
 *
 * Behavior:
 * - Updates the URL query parameters based on the selected date range.
 * - Provides buttons for quick date selection and a calendar for custom date selection.
 * - Clears the selected date range when the cancel icon is clicked.
 */
export default function DateFiltering() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const handleCalenderDateSelect = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      params.set("from", formattedDate);
      params.set("until", formattedDate);
      setDate(date);
      setIsCalenderOpen(false);
    }
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };

  const handleClickThisWeek = () => {
    const today = new Date();
    const endOfWeek = new Date(today);
    const daysUntilSunday = 6 - today.getDay();
    endOfWeek.setDate(today.getDate() + daysUntilSunday);

    const todaysDateFormatted = format(today, "yyyy-MM-dd");
    const endOfWeekDateFormatted = format(endOfWeek, "yyyy-MM-dd");

    const params = new URLSearchParams(searchParams);
    params.set("from", todaysDateFormatted);
    params.set("until", endOfWeekDateFormatted);
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };

  const handleClickThisMonth = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const todaysDateFormatted = format(today, "yyyy-MM-dd");
    const endOfMonthDateFormatted = format(endOfMonth, "yyyy-MM-dd");

    const params = new URLSearchParams(searchParams);
    params.set("from", todaysDateFormatted);
    params.set("until", endOfMonthDateFormatted);
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };

  const handleClickNextMonth = () => {
    const today = new Date();
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    const startOfNextMonthDateFormatted = format(
      startOfNextMonth,
      "yyyy-MM-dd"
    );
    const endOfNextMonthDateFormatted = format(endOfNextMonth, "yyyy-MM-dd");

    const params = new URLSearchParams(searchParams);
    params.set("from", startOfNextMonthDateFormatted);
    params.set("until", endOfNextMonthDateFormatted);
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };

  const handleClearDate = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("from");
    params.delete("until");
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };

  // For displaying the date in the button
  let from = searchParams.get("from");
  let until = searchParams.get("until");
  let hasDateQuery = from && until;
  let dateDisplayed = "";
  if (from && until) {
    from = new Date(from).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
    until = new Date(until).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
    if (from === until) {
      dateDisplayed = from;
    } else {
      dateDisplayed = `${from} - ${until}`;
    }
  }

  return (
    <div className="flex space-x-1 items-center">
      <DropdownMenu open={isCalenderOpen} onOpenChange={setIsCalenderOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="px-5">
            {hasDateQuery ? <>{dateDisplayed}</> : <>Date</>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex justify-center p-2">
            <DropdownMenuItem onClick={handleClickThisWeek}>
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClickThisMonth}>
              This Month
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClickNextMonth}>
              Next Month
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalenderDateSelect}
            className="rounded-md"
          />
        </DropdownMenuContent>
      </DropdownMenu>
      {hasDateQuery && <Cancel handleCancel={handleClearDate} />}
    </div>
  );
}
