import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HabitFormValues } from "@/validations/habit";
import { weekdays } from "@/lib/frequency";

interface WeekdaysFieldProps {
  control: Control<HabitFormValues>;
  errors: FieldErrors<HabitFormValues>;
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
              {weekdays.map(({ label, value }) => {
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
                          ? selectedDays.filter((d: number) => d !== value)
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
