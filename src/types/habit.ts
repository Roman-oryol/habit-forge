import { z } from "zod";
import { habitSchema } from "@/schemas/habit";

export type Frequency =
  | { type: "daily" }
  | { type: "weekdays"; days: number[] }
  | { type: "timesPerWeek"; count: number };

export type Habit = z.infer<typeof habitSchema>;

export type CreateHabitInput = Omit<
  Habit,
  "id" | "createdAt" | "completions" | "archived"
>;
