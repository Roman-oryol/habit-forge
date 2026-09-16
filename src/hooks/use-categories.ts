import { getCategories } from "@/api/categories";
import { useQuery } from "@tanstack/react-query";

export const categoriesKeys = {
  all: ["categories"] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.all,
    queryFn: getCategories,
  });
}
