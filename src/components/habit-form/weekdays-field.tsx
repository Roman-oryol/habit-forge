import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { habitFormValues } from "@/validations/habit";

const WEEKDAYS = [
  { label: "Mon", value: 0 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 3 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 5 },
  { label: "Sun", value: 6 },
];

interface WeekdaysFieldProps {
  control: Control<habitFormValues>;
  errors: FieldErrors<habitFormValues>;
}

export function WeekdaysField({ control, errors }: WeekdaysFieldProps) {
  return (
    <Controller
      control={control}
      name="days"
      render={({ field }) => {
        const selectedDays = field.value ?? [];

        return (
          <div
            className={cn(
              "border-border/50 rounded-xl border p-4 transition-colors",
              errors.days && "border-destructive",
            )}
          >
            <div className="mb-4 flex items-start gap-3">
              <CalendarDays className="text-primary size-6 shrink-0" />
              <div>
                <CardTitle>Weekdays</CardTitle>
                <CardDescription>
                  Do this habit on specific weekdays.
                </CardDescription>
              </div>
            </div>

            <p className="text-muted-foreground mb-2 text-sm">Select day</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2">
              {WEEKDAYS.map(({ label, value }) => {
                const selected = selectedDays.includes(value);
                return (
                  <Button
                    key={value}
                    type="button"
                    className={cn(
                      !selected &&
                        "bg-muted text-muted-foreground hover:bg-muted/80",
                    )}
                    onClick={() =>
                      field.onChange(
                        selected
                          ? selectedDays.filter((d) => d !== value)
                          : [...selectedDays, value],
                      )
                    }
                  >
                    {label}
                  </Button>
                );
              })}
            </div>

            {errors.days && (
              <p className="text-destructive mt-2 text-sm">
                {errors.days.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
