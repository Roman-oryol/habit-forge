import { z } from "zod";

export const habitShema = z
  .object({
    name: z.string().trim().min(2, "Minimum 2 characters").max(60),
    category: z.string().trim().min(1, "Category is required"),
    frequencyType: z.enum(["daily", "weekdays", "timesPerWeek"]),
    days: z.array(z.number().min(0).max(6)).optional(),
    timesPerWeek: z.number().min(1).max(7).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.frequencyType === "weekdays" && !data.days?.length) {
      ctx.addIssue({
        code: "custom",
        path: ["days"],
        message: "Select at least one day",
      });
    }

    if (data.frequencyType === "timesPerWeek" && !data.timesPerWeek) {
      ctx.addIssue({
        code: "custom",
        path: ["timesPerWeek"],
        message: "Select at least one day per week",
      });
    }
  });

export type habitFormValues = z.infer<typeof habitShema>;
