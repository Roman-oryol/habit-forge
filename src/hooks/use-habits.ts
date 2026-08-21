import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/api/habits";

export const habitsKeys = {
  all: ["habits"] as const,
};

export function useHabits() {
  return useQuery({
    queryKey: habitsKeys.all,
    queryFn: getHabits,
  });
}
