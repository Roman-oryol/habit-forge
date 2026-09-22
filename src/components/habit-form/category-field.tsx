import { useEffect } from "react";
import { useController, type Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-categories";
import type { HabitFormValues } from "@/validations/habit";
import { Link } from "lucide-react";

interface CategoryFieldProps {
  control: Control<HabitFormValues>;
  invalid?: boolean;
}

const CategoryField = ({ control, invalid }: CategoryFieldProps) => {
  const { data: categories = [], isPending } = useCategories();
  const { field } = useController({ name: "categoryId", control });

  useEffect(() => {
    const isOrphaned =
      field.value && !categories.some((c) => c.id === field.value);
    if (!isPending && isOrphaned) {
      field.onChange("");
    }
  }, [isPending, categories, field]);

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
    <Select
      items={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
      value={field.value}
      onValueChange={field.onChange}
      id="category"
    >
      <SelectTrigger className="w-full" aria-invalid={invalid}>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {categories.map((category) => (
          <SelectItem className="px-3" key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default CategoryField;
