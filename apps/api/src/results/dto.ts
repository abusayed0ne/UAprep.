import { z } from "zod";
export const questionReportSchema = z.object({
  questionVersionId: z.string().min(1),
  category: z.enum([
    "WRONG_ANSWER_KEY",
    "AMBIGUOUS_QUESTION",
    "EXPLANATION_PROBLEM",
    "BROKEN_IMAGE",
    "FORMATTING_PROBLEM",
    "OTHER",
  ]),
  details: z.string().max(3000).optional(),
});
