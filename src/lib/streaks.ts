import type { Habit } from "@/types/habit";
import {
  countCompletionsInWeek,
  startOfWeek,
  subDays,
  toDateKey,
} from "./date";

function getDay(date: Date): number {
  return date.getDay();
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
