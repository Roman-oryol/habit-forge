import { createCategory } from "@/api/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesKeys } from "./use-categories";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}
