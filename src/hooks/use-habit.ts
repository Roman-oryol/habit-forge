import { useQuery } from "@tanstack/react-query";
import { habitsKeys } from "./use-habits";
import { getHabit } from "@/api/habits";

export function useHabit(id: string | undefined) {
  return useQuery({
    queryKey: habitsKeys.detail(id ?? ""),
    queryFn: () => getHabit(id!),
    enabled: !!id,
  });
}
