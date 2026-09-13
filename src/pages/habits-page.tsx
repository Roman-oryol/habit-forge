import { useHabits } from "@/hooks/use-habits";
import PageHeader from "@/components/page-header";
import NewHabitButton from "@/components/new-habit-button";
import HabitCard from "@/components/habits/habit-card";

const HabitsPage = () => {
  const { data: habits, isPending, isError, error } = useHabits();

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <PageHeader title="Habits" actions={<NewHabitButton />} />

      {isPending && (
        <p className="text-muted-foreground text-sm">Loading habits…</p>
      )}

      {isError && (
        <p className="text-destructive text-sm">
          Failed to load habits: {error.message}
        </p>
      )}

      {habits && habits.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No habits yet. Create your first one.
        </p>
      )}

      {habits && habits.length > 0 && (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid gap-3 pb-4 lg:grid-cols-2 xl:grid-cols-3">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default HabitsPage;
