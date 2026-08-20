import type { Habit, CreateHabitInput } from "@/types/habit";

const STORAGE_KEY = "habitforge:habits";
const FAKE_DELAY = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), FAKE_DELAY));
}

function readAll(): Habit[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeAll(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export async function getHabits(): Promise<Habit[]> {
  return delay(readAll());
}

export async function getHabit(id: string): Promise<Habit | undefined> {
  return delay(readAll().find((h) => h.id === id));
}

export async function createHabit(input: CreateHabitInput): Promise<Habit> {
  const habit: Habit = {
    ...input,
    id: crypto.randomUUID(),
    archived: false,
    createdAt: new Date().toISOString(),
    completions: [],
  };
  const habits = readAll();
  writeAll([...habits, habit]);
  return delay(habit);
}

export async function updateHabit(
  id: string,
  patch: Partial<Habit>,
): Promise<Habit> {
  const habits = readAll();
  const index = habits.findIndex((h) => h.id === id);
  if (index === -1) throw new Error(`Habit ${id} not found`);

  const updated = { ...habits[index], ...patch };
  const nextHabits = habits.map((h) => (h.id === id ? updated : h));

  writeAll(nextHabits);
  return delay(updated);
}

export async function deleteHabit(id: string): Promise<void> {
  writeAll(readAll().filter((h) => h.id !== id));
  return delay(undefined);
}

export async function toggleCompletion(
  id: string,
  date: string,
): Promise<Habit> {
  const habits = readAll();
  const habit = habits.find((h) => h.id === id);
  if (!habit) throw new Error(`Habit ${id} not found`);

  const has = habit.completions.includes(date);
  const completions = has
    ? habit.completions.filter((d) => d !== date)
    : [...habit.completions, date];

  const updated = { ...habit, completions };
  const nextHabits = habits.map((h) => (h.id === id ? updated : h));

  writeAll(nextHabits);
  return delay(updated);
}
