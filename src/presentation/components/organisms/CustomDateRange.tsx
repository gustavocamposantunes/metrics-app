
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ICustomDateRange {
  name: string;
}

export const CustomDateRange: React.FC<ICustomDateRange> = ({
  name
}) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div data-testid="date-range" className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-full justify-start text-left font-normal cursor-pointer"
            data-testid="date-range-trigger"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <input type="hidden" name={`${name}-start`} value={date?.from?.toISOString() ?? undefined} />
            <input type="hidden" name={`${name}-end`} value={date?.to?.toISOString() ?? undefined} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}