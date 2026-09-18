import { describe, it, expect } from "vitest";
import { calculateStreak } from "./streaks";
import type { Habit } from "@/types/habit";

function makeHabit(overrides: Partial<Habit>): Habit {
  return {
    id: "test-id",
    name: "Test habit",
    categoryId: "test-category-id",
    archived: false,
    createdAt: "2020-01-01T00:00:00.000Z",
    completions: [],
    frequency: { type: "daily" },
    ...overrides,
  };
}

describe("calculateStreak — daily", () => {
  it("считает подряд идущие дни, включая сегодня", () => {
    const habit = makeHabit({
      completions: ["2026-08-27", "2026-08-26", "2026-08-25"],
    });
    expect(calculateStreak(habit, new Date("2026-08-27"))).toBe(3);
  });

  it("считает подряд идущие дни, не включая сегодня", () => {
    const habit = makeHabit({
      completions: ["2026-08-26", "2026-08-25"],
    });
    expect(calculateStreak(habit, new Date("2026-08-27"))).toBe(2);
  });

  it("считает подряд идущие дни, вчера - пропущен", () => {
    const habit = makeHabit({
      completions: ["2026-08-27", "2026-08-25"],
    });
    expect(calculateStreak(habit, new Date("2026-08-27"))).toBe(1);
  });

  it("считает подряд идущие дни, сегодня и вчера не выполнено", () => {
    const habit = makeHabit({
      completions: [],
    });
    expect(calculateStreak(habit, new Date("2026-08-27"))).toBe(0);
  });
});

describe("calculateStreak — weekdays", () => {
  const habit = makeHabit({
    frequency: { type: "weekdays", days: [1, 3, 5] }, // Пн, Ср, Пт
    completions: ["2026-08-26", "2026-08-24", "2026-08-21"],
  });

  it("считает все релевантные дни, если они выполнены", () => {
    expect(calculateStreak(habit, new Date("2026-08-26"))).toBe(3);
  });

  it("не ломает стрик, если сегодня релевантный день, но ещё не отмечен", () => {
    const habitNotDoneToday = makeHabit({
      frequency: { type: "weekdays", days: [1, 3, 5] },
      completions: ["2026-08-24", "2026-08-21"],
    });
    expect(calculateStreak(habitNotDoneToday, new Date("2026-08-26"))).toBe(2);
  });

  it("начинает новый стрик из-за пропущенного дня", () => {
    const habitDoneToday = makeHabit({
      frequency: { type: "weekdays", days: [1, 3, 5] },
      completions: ["2026-08-26", "2026-08-21"],
    });
    expect(calculateStreak(habitDoneToday, new Date("2026-08-26"))).toBe(1);
  });
});

describe("calculateStreak — timesPerWeek", () => {
  it("считает количество недель с выполненным целевым количеством повторений в неделю, исключая текущую", () => {
    const habit = makeHabit({
      frequency: { type: "timesPerWeek", count: 3 },
      completions: [
        "2026-08-26",
        "2026-08-25",
        "2026-08-20",
        "2026-08-19",
        "2026-08-17",
        "2026-08-14",
        "2026-08-12",
        "2026-08-11",
      ],
    });
    expect(calculateStreak(habit, new Date("2026-08-26"))).toBe(2);
  });

  it("считает количество недель с выполненным целевым количеством повторений в неделю, включая текущую", () => {
    const habit = makeHabit({
      frequency: { type: "timesPerWeek", count: 3 },
      completions: [
        "2026-08-26",
        "2026-08-25",
        "2026-08-24",
        "2026-08-20",
        "2026-08-19",
        "2026-08-17",
        "2026-08-14",
        "2026-08-12",
        "2026-08-11",
      ],
    });
    expect(calculateStreak(habit, new Date("2026-08-26"))).toBe(3);
  });

  it("считает количество недель с перевыполненным целевым количеством повторений в неделю", () => {
    const habit = makeHabit({
      frequency: { type: "timesPerWeek", count: 3 },
      completions: [
        "2026-08-26",
        "2026-08-25",
        "2026-08-24",
        "2026-08-20",
        "2026-08-19",
        "2026-08-18",
        "2026-08-17",
        "2026-08-14",
        "2026-08-12",
        "2026-08-11",
      ],
    });
    expect(calculateStreak(habit, new Date("2026-08-26"))).toBe(3);
  });
});
