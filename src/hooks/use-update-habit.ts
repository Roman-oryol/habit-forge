import { useMutation, useQueryClient } from "@tanstack/react-query";
import { habitsKeys } from "./use-habits";
import type { Habit } from "@/types/habit";
import { updateHabit } from "@/api/habits";

export function useUpdateHabit(id: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch: Partial<Habit>) => updateHabit(id!, patch),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: habitsKeys.all });
    },
  });
}
