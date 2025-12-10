import { ISubCategory } from "./sub_category.interface";

export interface ICategory {
  id?: number;
  name: string;
}

export interface IGetCategoriesAndSub extends ICategory {
  sub_categories: ISubCategory[];
}
