import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { habitShema, type habitFormValues } from "@/validations/habit";
import { FrequencyTypeField } from "./frequency-type-field";
import { WeekdaysField } from "./weekdays-field";
import { TimesPerWeekField } from "./times-per-week-field";
import type { CreateHabitInput, Frequency } from "@/types/habit";

type HabitFormProps = {
  onFormSubmit: (input: CreateHabitInput) => void;
};

const toFrequency = (values: habitFormValues): Frequency => {
  switch (values.frequencyType) {
    case "daily":
      return { type: "daily" };
    case "weekdays":
      return { type: "weekdays", days: values.days ?? [] };
    case "timesPerWeek":
      return { type: "timesPerWeek", count: values.timesPerWeek ?? 1 };
  }
};

const HabitForm = ({ onFormSubmit }: HabitFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<habitFormValues>({
    resolver: zodResolver(habitShema),
    defaultValues: {
      name: "",
      category: "",
      frequencyType: "daily",
      days: [],
      timesPerWeek: 1,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const frequencyType = watch("frequencyType");
  const onSubmit = handleSubmit((values) => {
    const input: CreateHabitInput = {
      name: values.name,
      category: values.category,
      frequency: toFrequency(values),
    };
    onFormSubmit(input);
  });

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="name">
              Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="e.g. Read a book"
              aria-invalid={!!errors.name?.message}
            />
            {errors.name && (
              <span className="text-destructive">{errors.name.message}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="category">
              Category
            </Label>
            <Input
              {...register("category")}
              id="category"
              placeholder="e.g. Personal, Health, Learning"
              aria-invalid={!!errors.category?.message}
            />
            {errors.category && (
              <span className="text-destructive">
                {errors.category.message}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="frequencyType">
              Frequency
            </Label>
            <FrequencyTypeField control={control} />
          </div>
        </CardHeader>
        <CardContent>
          {frequencyType === "weekdays" && (
            <WeekdaysField control={control} errors={errors} />
          )}
          {frequencyType === "timesPerWeek" && (
            <TimesPerWeekField control={control} />
          )}
        </CardContent>
      </Card>

      <Button type="submit">Create habit</Button>
    </form>
  );
};
export default HabitForm;
