import { Repeat2, CalendarDays, Hash } from "lucide-react";
import type { Frequency } from "@/types/habit";

export const frequencyTypes = [
  { label: "Daily", value: "daily", icon: Repeat2 },
  { label: "Weekdays", value: "weekdays", icon: CalendarDays },
  { label: "Times per week", value: "timesPerWeek", icon: Hash },
];

export const weekdays = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 0 },
];

export function getFrequencyTitle(frequency: Frequency): string {
  switch (frequency.type) {
    case "daily":
      return "Daily";
    case "weekdays":
      return "Weekdays";
    case "timesPerWeek":
      return `${frequency.count} times per week`;
  }
}

export function getFrequencySubtitle(frequency: Frequency): string | null {
  switch (frequency.type) {
    case "daily":
      return null;
    case "weekdays":
      return weekdays
        .filter((w) => frequency.days.includes(w.value))
        .map((w) => w.label)
        .join(", ");
    case "timesPerWeek":
      return `Target: ${frequency.count}x per week`;
  }
}

export function getStreakUnitLabel(frequency: Frequency): string {
  return frequency.type === "timesPerWeek" ? "week streak" : "day streak";
}
