import { z } from "zod";

export const searchUrlSchema = z.object({
  page: z.coerce.number({ required_error: "page no is required" }),
  searchString: z.string({ required_error: "search string is required" }),
  section: z.string({ required_error: "section is required" }),
});
export type SearchUrl = z.infer<typeof searchUrlSchema>;
