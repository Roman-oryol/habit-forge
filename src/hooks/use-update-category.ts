import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesKeys } from "./use-categories";
import { updateCategory } from "@/api/categories";
import type { Category } from "@/types/category";

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch: Partial<Category>) => updateCategory(id, patch),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}
