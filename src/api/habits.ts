import type { Habit, CreateHabitInput } from "@/types/habit";

const API_URL = import.meta.env.VITE_API_URL;

export async function getHabits(): Promise<Habit[]> {
  const res = await fetch(`${API_URL}/habits`);
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
}

export async function getHabit(id: string): Promise<Habit | undefined> {
  const res = await fetch(`${API_URL}/habits/${id}`);
  if (!res.ok) throw new Error("Failed to fetch habit");
  return res.json();
}

export async function createHabit(input: CreateHabitInput): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create habit");
  return res.json();
}

export async function updateHabit(
  id: string,
  patch: Partial<Habit>,
): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error("Failed to update habit");
  return res.json();
}

export async function deleteHabit(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/habits/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete habit");
}

export async function toggleCompletion(
  id: string,
  date: string,
): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits/${id}/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });
  if (!res.ok) throw new Error("Failed to toggle habit completion");
  return res.json();
}
