import { toggleCompletion } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { habitsKeys } from "./use-habits";

interface ToggleCompletionInput {
  id: string;
  date: string;
}

export function useToggleHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, date }: ToggleCompletionInput) =>
      toggleCompletion(id, date),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: habitsKeys.all });
    },
  });
}
