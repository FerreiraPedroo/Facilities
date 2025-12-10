import { db } from "@/database/db";
import {
  ICategory,
  IGetCategoriesAndSub,
} from "@/types/interfaces/category.interface";

export class CategoryRepository {
  static dataBase = db;

  static async getAllCategoriesAndSub() {
    const categories = await this.dataBase.categories
      .where("name")
      .notEqual("")
      .toArray();

    const categoriesSize = categories.length;
    const categoriesWithSub: IGetCategoriesAndSub[] = [];

    for (let p = 0; p < categoriesSize; p++) {
      const sub_categories = await this.dataBase.sub_categories
        .where("category_id")
        .equals(categories[p]!.id!)
        .toArray();

      categoriesWithSub.push({ ...categories[p]!, sub_categories });
    }

    return categoriesWithSub;
  }
  static async saveCategory(categoryName: ICategory) {
    return await this.dataBase.categories.add(categoryName);
  }
}
