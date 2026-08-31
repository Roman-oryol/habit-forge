import type { Habit } from "@/types/habit";
import { toDateKey } from "./date";

function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function getDay(date: Date): number {
  return date.getDay();
}

function startOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  return subDays(date, diff);
}

function countCompletionsInWeek(
  completions: string[],
  weekStart: Date,
): number {
  const weekEnd = subDays(weekStart, -6);
  return completions.filter((iso) => {
    const date = new Date(iso);
    return date >= weekStart && date <= weekEnd;
  }).length;
}

function calculateDailyStreak(completions: string[], today: Date): number {
  let streak = 0;
  let offset = 0;

  if (!completions.includes(toDateKey(today))) {
    offset = 1;
  }

  while (completions.includes(toDateKey(subDays(today, offset)))) {
    streak++;
    offset++;
  }

  return streak;
}

function calculateWeekdaysStreak(
  completions: string[],
  days: number[],
  today: Date,
): number {
  let streak = 0;
  let offset = 0;

  const todayIsRelevant = days.includes(getDay(today));
  const todayDone = completions.includes(toDateKey(today));

  if (todayIsRelevant && !todayDone) {
    offset = 1;
  }

  while (true) {
    const date = subDays(today, offset);
    const isRelevant = days.includes(getDay(date));

    if (!isRelevant) {
      offset++;
      continue;
    }

    if (completions.includes(toDateKey(date))) {
      streak++;
      offset++;
    } else {
      break;
    }
  }

  return streak;
}

function calculateTimesPerWeekStreak(
  completions: string[],
  count: number,
  today: Date,
): number {
  let streak = 0;
  let offset = 0;

  const currentWeekStart = startOfWeek(today);
  const currentWeekCompletions = countCompletionsInWeek(
    completions,
    currentWeekStart,
  );
  if (currentWeekCompletions < count) {
    offset = 1;
  }

  while (true) {
    const weekStart = startOfWeek(subDays(today, offset * 7));
    const completionsInWeek = countCompletionsInWeek(completions, weekStart);

    if (completionsInWeek >= count) {
      streak++;
      offset++;
    } else {
      break;
    }
  }

  return streak;
}

export function calculateStreak(
  habit: Habit,
  today: Date = new Date(),
): number {
  switch (habit.frequency.type) {
    case "daily":
      return calculateDailyStreak(habit.completions, today);
    case "weekdays":
      return calculateWeekdaysStreak(
        habit.completions,
        habit.frequency.days,
        today,
      );
    case "timesPerWeek":
      return calculateTimesPerWeekStreak(
        habit.completions,
        habit.frequency.count,
        today,
      );
  }
}
