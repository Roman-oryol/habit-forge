import type { Category, CreateCategoryInput } from "@/types/category";
import { apiFetch } from "./client";

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export function createCategory(input: CreateCategoryInput): Promise<Category> {
  return apiFetch<Category>("/categories", { method: "POST", body: input });
}

export function updateCategory(
  id: string,
  patch: Partial<Category>,
): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    method: "PATCH",
    body: patch,
  });
}

export function deleteCategory(id: string): Promise<void> {
  return apiFetch<void>(`/categories/${id}`, { method: "DELETE" });
}
