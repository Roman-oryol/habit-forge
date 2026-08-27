import { createHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { habitsKeys } from "@/hooks/use-habits";

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitsKeys.all });
    },
  });
}
