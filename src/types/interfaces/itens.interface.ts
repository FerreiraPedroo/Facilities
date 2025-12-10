// import { EItemStatus } from "../enums/item-status.enum";
import { ICategory } from "./category.interface";
import { ISubCategory } from "./sub_category.interface";

export interface IItem {
  id?: number;
  code: string;
  name: string;
  category_id: number;
  sub_category_id: number;
  status: string;
}

export interface IItemWithCatAndSub extends IItem {
  category: ICategory | null;
  sub_category: ISubCategory | null;
}
