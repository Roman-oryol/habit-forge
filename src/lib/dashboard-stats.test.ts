import { describe, it, expect } from "vitest";
import {
  getCompletedTodayStats,
  getOverallStreak,
  getWeeklyConsistency,
} from "./dashboard-stats";
import type { Habit } from "@/types/habit";

function makeHabit(overrides: Partial<Habit>): Habit {
  return {
    id: "test-id",
    name: "Test habit",
    category: "Test",
    archived: false,
    createdAt: "2020-01-01T00:00:00.000Z",
    completions: [],
    frequency: { type: "daily" },
    ...overrides,
  };
}

describe("getCompletedTodayStats", () => {
  it("считает выполненные и общие due-привычки на дату", () => {
    const habits = [
      makeHabit({ frequency: { type: "daily" }, completions: ["2026-08-26"] }),
      makeHabit({ frequency: { type: "daily" }, completions: [] }),
      makeHabit({
        frequency: { type: "weekdays", days: [2] },
        completions: [],
      }),
    ];
    expect(getCompletedTodayStats(habits, new Date("2026-08-26"))).toEqual({
      completed: 1,
      total: 2,
    });
  });

  it("возвращает нули, если привычек нет", () => {
    expect(getCompletedTodayStats([], new Date("2026-08-26"))).toEqual({
      completed: 0,
      total: 0,
    });
  });
});

describe("getOverallStreak", () => {
  it("считает серию дней со всеми выполненными привычками", () => {
    const habits = [
      makeHabit({
        frequency: { type: "daily" },
        completions: ["2026-08-25", "2026-08-24"],
      }),
      makeHabit({
        frequency: { type: "weekdays", days: [2] },
        completions: ["2026-08-25"],
      }),
    ];
    expect(getOverallStreak(habits, new Date("2026-08-26"))).toBe(2);
  });
  it("отсутвсие серии в случае пустого списка привычек", () => {
    const habits: Habit[] = [];
    expect(getOverallStreak(habits, new Date("2026-08-26"))).toBe(0);
  });
});

describe("getWeeklyConsinstency", () => {
  it("считает процент выполения привычек за прошедшую неделю, включая сегодня", () => {
    const habits = [
      makeHabit({
        frequency: { type: "daily" },
        completions: ["2026-08-25", "2026-08-24", "2026-08-23"],
      }),
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-26", "2026-08-24", "2026-08-21"],
      }),
    ];
    expect(getWeeklyConsistency(habits, new Date("2026-08-26"))).toBe(60);
  });

  it("за прошедшую неделю не было ни одного дня с привычкой к выполнению", () => {
    const habits: Habit[] = [];
    expect(getWeeklyConsistency(habits, new Date("2026-08-26"))).toBe(null);
  });
});
