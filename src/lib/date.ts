export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export function startOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  return subDays(date, diff);
}

export function countCompletionsInWeek(
  completions: string[],
  weekStart: Date,
): number {
  const weekEnd = subDays(weekStart, -6);
  return completions.filter((iso) => {
    const date = new Date(iso);
    return date >= weekStart && date <= weekEnd;
  }).length;
}
