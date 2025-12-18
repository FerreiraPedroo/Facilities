import { db } from "@/database/db";
import { ICategory } from "@/types/interfaces/category.interface";
import { IItem, IItemWithCatAndSub } from "@/types/interfaces/itens.interface";
import { ISubCategory } from "@/types/interfaces/sub_category.interface";

export class ItemRepository {
  static dataBase = db;

  static async saveItem(item: IItem) {
    try {
      return await this.dataBase.item.add(item);
    } catch (e) {
      throw { message: "Não foi possivel salvar." };
    }
  }
  static async saveImportItens(itens: IItem & IItem[]) {
    console.log(itens);
    console.log(itens instanceof Array);
    try {
      if (itens instanceof Array) {
        return await this.dataBase.item.bulkAdd(itens);
      } else {
        return await this.dataBase.item.add(itens);
      }
    } catch (e) {
      throw { message: "Não foi possivel importar.", e };
    }
  }
  static async getItensList() {
    const itens = await this.dataBase.item.toArray();
    const categories = await this.dataBase.categories.toArray();
    const subCategories = await this.dataBase.sub_categories.toArray();

    const itensSize = itens.length;
    const itensWithCategoryAndSub: IItemWithCatAndSub[] = [];

    for (let p = 0; p < itensSize; p++) {
      let category: ICategory | undefined;
      let sub_category: ISubCategory | undefined;
      if (Number(itens[p]!.category_id!)) {
        category = categories.find(
          (c) => c.id == Number(itens[p]!.category_id!)
        );
      }
      if (Number(itens[p]!.sub_category_id!)) {
        category = subCategories.find(
          (c) => c.id == Number(itens[p]!.sub_category_id!)
        );
      }
      itensWithCategoryAndSub.push({
        ...itens[p]!,
        category: category ?? null,
        sub_category: sub_category ?? null,
      });
    }

    return itensWithCategoryAndSub;
  }
}
