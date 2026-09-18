import { useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import type { HabitFormValues } from "@/validations/habit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-categories";
import { Link } from "react-router";

interface CategoryFieldProps {
  control: Control<HabitFormValues>;
}

const CategoryField = ({ control }: CategoryFieldProps) => {
  const { data: categories = [], isPending } = useCategories();
  const items = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories],
  );

  if (!isPending && categories.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No categories yet.{" "}
        <Link to="/categories" className="text-primary underline">
          Create one first
        </Link>
        .
      </p>
    );
  }

  return (
    <Controller
      name="categoryId"
      control={control}
      render={({ field }) => {
        return (
          <Select
            items={items}
            value={field.value}
            onValueChange={field.onChange}
            id="category"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {categories.map((category) => (
                <SelectItem
                  className="px-3"
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
};
export default CategoryField;
