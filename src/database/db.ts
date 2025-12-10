import Dexie, { Table } from "dexie";

import { IItem } from "@/types/interfaces/itens.interface";
import { IProject } from "@/types/interfaces/projeto.interface";
import { ICategory } from "@/types/interfaces/category.interface";
import { IFornecedor } from "@/types/interfaces/fornecedor.interface";
import { ISubCategory } from "@/types/interfaces/sub_category.interface";
import { ICentroCusto } from "@/types/interfaces/centro-custo.interface";
import { IPedidoCompra } from "@/types/interfaces/pedido-compra.interface";
import { IGrupoPagamento } from "@/types/interfaces/grupo-pagamento.interface";
import { IItemRequisicao } from "@/types/interfaces/item-requisicao.interface";
import { IPurchaseRequisition } from "@/types/interfaces/purchase_requisition.interface";
import { IUnit } from "@/types/interfaces/unit.interface";

export class DataBase extends Dexie {
  centro_custo!: Table<ICentroCusto, number>;
  fornecedores!: Table<IFornecedor, number>;
  grupo_pagamento!: Table<IGrupoPagamento, number>;
  item!: Table<IItem, number>;
  itens_requisicao!: Table<IItemRequisicao, number>;
  pedido_compras!: Table<IPedidoCompra, number>;
  projects!: Table<IProject, number>;
  purchase_requisition!: Table<IPurchaseRequisition, number>;
  categories!: Table<ICategory, number>;
  sub_categories!: Table<ISubCategory, number>;
  unit!: Table<IUnit, number>;

  constructor() {
    super("Facilities");
    this.version(1).stores({
      centro_custo: "++id, nome",
      fornecedores: "++id, cnpj, nome",
      grupo_pagamento: "++id, codigo, nome",
      item: "++id, &code, &name, category_id, sub_category_id, status",
      itens_requisicao:
        "++id, item_id, requisicao_id, pedido_compra_id, grupo_pagamento_id, centro_custo_id, projeto_id, quantidade",
      pedido_compras: "++id, codigo, requisicao_id, fornecedor_id",
      projects:
        "++id, code, name, period, classification, unit_id, status, date_open, *budgets",
      purchase_requisition:
        "++id, requisition, name, justificative, date_open, *project_ids, status",
      categories: "++id, &name",
      sub_categories: "++id, &name, category_id",
      unit: "++id, name, alias, zone, status"
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  // SUB CATEGORY
  //////////////////////////////////////////////////////////////////////////////////////////
  async saveSubCategory(subCategory: ISubCategory) {
    return await this.sub_categories.add(subCategory);
  }
}

const db = new DataBase();
db.open().catch(function (e) {
  console.error("Open failed: " + e.stack);
});

export { db };
