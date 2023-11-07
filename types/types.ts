import { Category, Product } from "@prisma/client";

export type CategoryChild = Category & {
  children: CategoryChild[];
};

export type ProductChild = Product & {
  category: Category;
};
