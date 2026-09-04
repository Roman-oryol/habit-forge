import type { Habit } from "@/types/habit";
import { startOfWeek, countCompletionsInWeek, toDateKey } from "@/lib/date";

export function isHabitDueToday(habit: Habit, date: Date): boolean {
  const dateKey = toDateKey(date);
  if (dateKey < habit.createdAt.slice(0, 10)) {
    return false;
  }

  switch (habit.frequency.type) {
    case "daily":
      return true;
    case "weekdays":
      return habit.frequency.days.includes(date.getDay());
    case "timesPerWeek": {
      const weekStart = startOfWeek(date);
      const completionsExcludingToday = habit.completions.filter(
        (d) => d !== dateKey,
      );
      const completedThisWeek = countCompletionsInWeek(
        completionsExcludingToday,
        weekStart,
      );
      return completedThisWeek < habit.frequency.count;
    }
  }
}

export function isPerfectDay(habits: Habit[], date: Date): boolean {
  const dateKey = toDateKey(date);
  const existedByThen = habits.some((h) => h.createdAt.slice(0, 10) <= dateKey);

  if (!existedByThen) {
    return false;
  }

  const dueHabits = habits.filter((h) => isHabitDueToday(h, date));

  if (dueHabits.length === 0) {
    return true;
  }

  return dueHabits.every((h) => h.completions.includes(dateKey));
}
