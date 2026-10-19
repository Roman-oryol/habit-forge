import { createHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { habitsKeys } from "@/hooks/use-habits";

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    meta: { successMessage: "Habit created" },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: habitsKeys.all });
    },
  });
}
