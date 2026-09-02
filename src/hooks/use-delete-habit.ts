import { deleteHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { habitsKeys } from "./use-habits";

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: habitsKeys.all });
    },
  });
}
