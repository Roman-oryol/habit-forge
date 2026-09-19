import { useState } from "react";
import { useHabits } from "@/hooks/use-habits";
import { useCategories } from "@/hooks/use-categories";
import PageHeader from "@/components/page-header";
import NewHabitButton from "@/components/new-habit-button";
import HabitCard from "@/components/habits/habit-card";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_CATEGORIES = "all";

const HabitsPage = () => {
  const { data: habits, isPending, isError, error } = useHabits();
  const { data: categories = [] } = useCategories();
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL_CATEGORIES);

  const categoryItems = [
    { label: "All categories", value: ALL_CATEGORIES },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];

  const filteredHabits =
    categoryFilter === ALL_CATEGORIES
      ? habits
      : habits?.filter((h) => h.categoryId === categoryFilter);

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <PageHeader title="Habits" actions={<NewHabitButton />} />

      {categories.length > 0 && (
        <Select
          items={categoryItems}
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value ?? ALL_CATEGORIES)}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {isPending && <Spinner className="text-muted size-8 self-center" />}

      {isError && (
        <p className="text-destructive text-sm">
          Failed to load habits: {error.message}
        </p>
      )}

      {filteredHabits && filteredHabits.length === 0 && (
        <p className="text-muted-foreground text-sm">
          {categoryFilter === "all"
            ? "No habits yet. Create your first one."
            : "No habits in this category."}
        </p>
      )}

      {filteredHabits && filteredHabits.length > 0 && (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid gap-3 pb-4 lg:grid-cols-2 xl:grid-cols-3">
            {filteredHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default HabitsPage;
