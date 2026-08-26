import { Controller, type Control } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { habitFormValues } from "@/validations/habit";

interface TimesPerWeekFieldProps {
  control: Control<habitFormValues>;
}

export function TimesPerWeekField({ control }: TimesPerWeekFieldProps) {
  return (
    <Controller
      control={control}
      name="timesPerWeek"
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={(field.value ?? 1) <= 1}
            onClick={() => field.onChange(Math.max(1, (field.value ?? 1) - 1))}
          >
            <Minus />
          </Button>
          <Input
            type="number"
            className="w-16 appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...field}
            value={field.value ?? "1"}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={(field.value ?? 1) >= 7}
            onClick={() => field.onChange(Math.min(7, (field.value ?? 1) + 1))}
          >
            <Plus />
          </Button>
        </div>
      )}
    />
  );
}
