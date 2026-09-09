import { describe, it, expect } from "vitest";
import { isHabitDueToday, isPerfectDay } from "./habit-schedule";
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

describe("isHabitDueToday", () => {
  it("daily всегда актуальна", () => {
    const habit = makeHabit({ frequency: { type: "daily" } });
    expect(isHabitDueToday(habit, new Date("2026-08-26"))).toBe(true);
  });

  it("weekdays актуальна только в указанные дни", () => {
    const habit = makeHabit({
      frequency: { type: "weekdays", days: [1, 3, 5] },
    });
    expect(isHabitDueToday(habit, new Date("2026-08-26"))).toBe(true); // среда
    expect(isHabitDueToday(habit, new Date("2026-08-25"))).toBe(false); // вторник
  });

  it("timesPerWeek актуальна, пока недельная норма не выполнена", () => {
    const habit = makeHabit({
      frequency: { type: "timesPerWeek", count: 2 },
      completions: ["2026-08-24", "2026-08-25"],
    });
    expect(isHabitDueToday(habit, new Date("2026-08-26"))).toBe(false); // норма уже набрана
  });

  it("не актуальна раньше даты создания привычки", () => {
    const habit = makeHabit({
      frequency: { type: "weekdays", days: [3] }, // среда
      createdAt: "2026-08-26T00:00:00.000Z",
    });
    expect(isHabitDueToday(habit, new Date("2026-08-19"))).toBe(false); // среда неделей раньше создания
  });
});

describe("isPerfectDay", () => {
  it("определяет выполнены ли все задачи на день", () => {
    const habits = [
      makeHabit({
        frequency: { type: "daily" },
        completions: ["2026-08-26", "2026-08-25"],
      }),
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-26", "2026-08-24"],
      }),
    ];

    expect(isPerfectDay(habits, new Date("2026-08-26"))).toBe(true);
  });

  it("одна задача на день не выполнена", () => {
    const habits = [
      makeHabit({
        frequency: { type: "daily" },
        completions: ["2026-08-26", "2026-08-25"],
      }),
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-24", "2026-08-21"],
      }),
    ];

    expect(isPerfectDay(habits, new Date("2026-08-26"))).toBe(false);
  });

  it("на день нет ни одной задачи к выполнению", () => {
    const habits = [
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-26", "2026-08-25"],
      }),
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-24", "2026-08-21"],
      }),
    ];

    expect(isPerfectDay(habits, new Date("2026-08-25"))).toBe(true);
  });

  it("на проверяемую дату не существует ни одной привычки", () => {
    const habits = [
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-26", "2026-08-25"],
        createdAt: "2026-08-20T00:00:00.000Z",
      }),
      makeHabit({
        frequency: { type: "weekdays", days: [1, 3, 5] },
        completions: ["2026-08-24", "2026-08-21"],
        createdAt: "2026-08-22T00:00:00.000Z",
      }),
    ];
    expect(isPerfectDay(habits, new Date("2026-08-17"))).toBe(false);
  });
});
