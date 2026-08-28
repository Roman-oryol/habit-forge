import { Controller, type Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { habitFormValues } from "@/validations/habit";
import { frequencyTypes } from "@/lib/frequency";

interface FrequencyTypeFieldProps {
  control: Control<habitFormValues>;
}

export function FrequencyTypeField({ control }: FrequencyTypeFieldProps) {
  return (
    <Controller
      control={control}
      name="frequencyType"
      render={({ field }) => {
        const selectedType = frequencyTypes.find(
          (t) => t.value === field.value,
        );

        return (
          <Select
            items={frequencyTypes}
            value={field.value}
            onValueChange={field.onChange}
            id="frequencyType"
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                {selectedType?.icon && (
                  <selectedType.icon className="text-primary size-4 shrink-0" />
                )}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {frequencyTypes.map((type) => (
                <SelectItem
                  className="px-3"
                  key={type.value}
                  value={type.value}
                >
                  <type.icon className="size-4" />
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
}
