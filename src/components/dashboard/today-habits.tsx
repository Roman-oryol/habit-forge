import { useHabits } from "@/hooks/use-habits";
import { isHabitDueToday } from "@/lib/habit-schedule";
import { Spinner } from "../ui/spinner";
import HabitCardCompact from "../habits/habit-card-compact";

const TodayHabits = () => {
  const { data: habits, isPending, isError, error } = useHabits();

  const todayHabits =
    habits?.filter((h) => isHabitDueToday(h, new Date())) ?? [];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold">Today's habits</h2>

      {isPending && <Spinner className="text-muted size-8 self-center" />}

      {isError && (
        <p className="text-destructive text-sm">
          Failed to load habits: {error.message}
        </p>
      )}

      {!isPending && !isError && todayHabits.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No habits scheduled for today.
        </p>
      )}

      {todayHabits.length > 0 && (
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {todayHabits.map((habit) => (
            <HabitCardCompact key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </section>
  );
};
export default TodayHabits;
