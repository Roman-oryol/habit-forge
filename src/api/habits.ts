import type { Habit, CreateHabitInput } from "@/types/habit";
import { apiFetch } from "./client";

export function getHabits(): Promise<Habit[]> {
  return apiFetch<Habit[]>("/habits");
}

export function getHabit(id: string): Promise<Habit> {
  return apiFetch<Habit>(`/habits/${id}`);
}

export function createHabit(input: CreateHabitInput): Promise<Habit> {
  return apiFetch<Habit>("/habits", { method: "POST", body: input });
}

export function updateHabit(id: string, patch: Partial<Habit>): Promise<Habit> {
  return apiFetch<Habit>(`/habits/${id}`, { method: "PATCH", body: patch });
}

export function deleteHabit(id: string): Promise<void> {
  return apiFetch<void>(`/habits/${id}`, { method: "DELETE" });
}

export function toggleCompletion(id: string, date: string): Promise<Habit> {
  return apiFetch<Habit>(`/habits/${id}/toggle`, {
    method: "POST",
    body: { date },
  });
}
