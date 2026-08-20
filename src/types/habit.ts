export type Frequency =
  | { type: "daily" }
  | { type: "weekdays"; days: number[] }
  | { type: "timesPerWeek"; count: number };

export interface Habit {
  id: string;
  name: string;
  category: string;
  frequency: Frequency;
  archived: boolean;
  createdAt: string; // ISO
  completions: string[]; // ISO-даты выполнения
}

export type CreateHabitInput = Omit<
  Habit,
  "id" | "createdAt" | "completions" | "archived"
>;
