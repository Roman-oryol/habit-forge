import { categorySchema } from "@/schemas/category";
import type { Category, CreateCategoryInput } from "@/types/category";
import { delay } from "./delay";

const STORAGE_KEY = "habitforge:categories";

function readAll(): Category[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    console.warn("Corrupted category data in localStorage — resetting.");
    return [];
  }

  if (!Array.isArray(parsed)) {
    console.warn("Categories data is not an array — resetting.");
    return [];
  }

  return parsed.filter((item): item is Category => {
    const result = categorySchema.safeParse(item);
    if (!result.success) {
      console.warn("Skipping invalid category record:", item, result.error);
    }
    return result.success;
  });
}

function writeAll(categories: Category[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export async function getCategories(): Promise<Category[]> {
  return delay(readAll());
}

export async function createCategory(
  input: CreateCategoryInput,
): Promise<Category> {
  const category: Category = {
    ...input,
    id: crypto.randomUUID(),
  };
  const categories = readAll();
  writeAll([...categories, category]);
  return delay(category);
}

export async function updateCategory(
  id: string,
  patch: Partial<Category>,
): Promise<Category> {
  const categories = readAll();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) throw new Error(`Category ${id} not found`);

  const updated = { ...categories[index], ...patch };
  const nextCategories = categories.map((c) => (c.id === id ? updated : c));
  writeAll(nextCategories);
  return delay(updated);
}

export async function deleteCategory(id: string): Promise<void> {
  writeAll(readAll().filter((h) => h.id !== id));
  return delay(undefined);
}
