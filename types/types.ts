import { Category } from "@prisma/client";

export type CategoryChild = Category & {
  children: CategoryChild[];
};
