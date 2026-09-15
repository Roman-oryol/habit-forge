import type { z } from "zod";
import { categorySchema } from "@/schemas/category";

export type Category = z.infer<typeof categorySchema>;

export type CreateCategoryInput = Omit<Category, "id">;
