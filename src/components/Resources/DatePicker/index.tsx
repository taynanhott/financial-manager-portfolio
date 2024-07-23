
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useDate } from "@/context/DateContext";

export function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>--/--/----</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerRange() {
  const { date, editDateIni, editDateEnd } = useDate();
  const [range, setRange] = React.useState<DateRange>({
    from: date?.dtini,
    to: date?.dtend,
  });

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    if (newRange) {
      const { from, to } = newRange;
      setRange(newRange);
      editDateIni(from || (to ?? new Date()));
      editDateEnd(to || (from ?? new Date()));
    }
    console.log(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-0 md:mr-2 lg:mr-2 h-4 w-4" />
          {range.from && range.to ? (
            <p className="hidden md:flex lg:flex">
              {format(range.from, "PPP", { locale: ptBR })} à{" "}
              {format(range.to, "PPP", { locale: ptBR })}
            </p>
          ) : (
            <span>--/--/----</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          id="date-range"
          mode="range"
          selected={range}
          onSelect={handleRangeSelect}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
