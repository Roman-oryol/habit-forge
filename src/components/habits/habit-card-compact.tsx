import { Circle, CircleCheck, Flame } from "lucide-react";
import type { Habit } from "@/types/habit";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { calculateStreak } from "@/lib/streaks";
import { useToggleHabit } from "@/hooks/use-toggle-habit";
import { toDateKey } from "@/lib/date";
import { Spinner } from "../ui/spinner";
import HabitActions from "./habit-actions";

interface HabitCardCompactProps {
  habit: Habit;
}

const HabitCardCompact = ({ habit }: HabitCardCompactProps) => {
  const mutation = useToggleHabit();
  const today = toDateKey(new Date());
  const isDoneToday = habit.completions.includes(today);
  const streak = calculateStreak(habit);

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">{habit.name}</CardTitle>
        <CardDescription className="text-xs">{habit.category}</CardDescription>
        <CardAction className="-mt-1">
          <HabitActions habitId={habit.id} habitName={habit.name} />
        </CardAction>
      </CardHeader>

      <div className="mt-auto flex items-center justify-between gap-3 px-3 pb-3">
        <Button
          size="sm"
          type="button"
          variant={isDoneToday ? "default" : "outline"}
          aria-pressed={isDoneToday}
          disabled={mutation.isPending}
          className={cn(
            "justify-start",
            isDoneToday &&
              "bg-primary/15 text-primary hover:bg-primary/20 border-primary/50",
          )}
          onClick={() => mutation.mutate({ id: habit.id, date: today })}
        >
          {mutation.isPending ? (
            <Spinner />
          ) : isDoneToday ? (
            <CircleCheck />
          ) : (
            <Circle />
          )}
          {isDoneToday ? "Done" : "Mark done"}
        </Button>

        <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
          <Flame className="text-primary size-6" />
          <span className="text-foreground text-lg font-semibold">
            {streak}
          </span>
        </div>
      </div>
    </Card>
  );
};
export default HabitCardCompact;
