import type { Habit } from "@/types/habit";
import { subDays, toDateKey } from "@/lib/date";
import { isHabitDueToday, isPerfectDay } from "@/lib/habit-schedule";

export function getCompletedTodayStats(
  habits: Habit[],
  today: Date = new Date(),
): { completed: number; total: number } {
  const dueToday = habits.filter((h) => isHabitDueToday(h, today));
  const completedToday = habits.filter((h) =>
    h.completions.includes(toDateKey(today)),
  );

  return { completed: completedToday.length, total: dueToday.length };
}

export const getOverallStreak = (
  habits: Habit[],
  today: Date = new Date(),
): number => {
  if (habits.length === 0) {
    return 0;
  }

  let streak = 0;
  let offset = 0;

  if (!isPerfectDay(habits, subDays(today, offset))) {
    offset++;
  }

  while (isPerfectDay(habits, subDays(today, offset))) {
    streak++;
    offset++;
  }

  return streak;
};

export function getWeeklyConsistency(
  habits: Habit[],
  today: Date = new Date(),
): number | null {
  let due = 0;
  let completed = 0;

  for (let offset = 0; offset <= 6; offset++) {
    const date = subDays(today, offset);
    due += habits.filter((h) => isHabitDueToday(h, date)).length;
    completed += habits.filter((h) =>
      h.completions.includes(toDateKey(date)),
    ).length;
  }

  if (due === 0) {
    return null;
  }

  return Math.round((completed / due) * 100);
}
