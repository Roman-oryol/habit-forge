import { z } from "zod";

const frequencySchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("daily") }),
  z.object({
    type: z.literal("weekdays"),
    days: z.array(z.number().min(0).max(6)),
  }),
  z.object({ type: z.literal("timesPerWeek"), count: z.number().min(1) }),
]);

export const habitSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
  frequency: frequencySchema,
  archived: z.boolean(),
  createdAt: z.string(),
  completions: z.array(z.string()),
});
