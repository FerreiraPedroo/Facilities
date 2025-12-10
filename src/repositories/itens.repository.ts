import { db } from "@/database/db";
import { IItem, IItemWithCatAndSub } from "@/types/interfaces/itens.interface";

export class ItemRepository {
  static dataBase = db;

  static async saveItem(item: IItem) {
    return await this.dataBase.item.add(item);
  }
  static async getItensList() {
    const itens = await this.dataBase.item.toArray();

    const itensSize = itens.length;
    const itensWithCategoryAndSub: IItemWithCatAndSub[] = [];

    for (let p = 0; p < itensSize; p++) {
      const category = await this.dataBase.categories.get(
        itens[p]!.category_id!
      );

      const sub_category = await this.dataBase.sub_categories.get(
        itens[p]!.sub_category_id!
      );

      itensWithCategoryAndSub.push({
        ...itens[p]!,
        category: category ?? null,
        sub_category: sub_category ?? null,
      });
    }

    return itensWithCategoryAndSub;
  }
}
