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
  createdAt: string;
  completions: string[];
}

export type CreateHabitInput = Omit<
  Habit,
  "id" | "createdAt" | "completions" | "archived"
>;
