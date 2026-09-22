import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/api/categories";
import { categoriesKeys } from "./use-categories";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}
