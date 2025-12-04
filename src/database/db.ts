import { IItem } from "@/types/interfaces/itens.interface";
import { IProjeto } from "@/types/interfaces/projeto.interface";
import { IRequisicao } from "@/types/interfaces/requisicao.interface";
import { IFornecedor } from "@/types/interfaces/fornecedor.interface";
import { ICentroCusto } from "@/types/interfaces/centro-custo.interface";
import { IPedidoCompra } from "@/types/interfaces/pedido-compra.interface";
import { IGrupoPagamento } from "@/types/interfaces/grupo-pagamento.interface";
import { IItemRequisicao } from "@/types/interfaces/item-requisicao.interface";

import Dexie, { Table } from "dexie";

export class DataBase extends Dexie {
  centro_custo!: Table<ICentroCusto, number>;
  fornecedores!: Table<IFornecedor, number>;
  grupo_pagamento!: Table<IGrupoPagamento, number>;
  itens!: Table<IItem, number>;
  itens_requisicao!: Table<IItemRequisicao, number>;
  pedido_compras!: Table<IPedidoCompra, number>;
  projetos!: Table<IProjeto, number>;
  requisicoes!: Table<IRequisicao, number>;

  constructor() {
    super("Facilities");
    this.version(1).stores({
      centro_custo: "++id, nome",
      fornecedores: "++id, cnpj, nome",
      grupo_pagamento: "++id, codigo, nome",
      itens: "++id, codigo, nome, unidade, status",
      itens_requisicao:
        "++id, item_id, requisicao_id, pedido_compra_id, grupo_pagamento_id, centro_custo_id, projeto_id, quantidade",
      pedido_compras: "++id, codigo, requisicao_id, fornecedor_id",
      projetos:
        "++id, codigo, classificacao, nome, unidade_id, status, data_abertura",
      requisicoes:
        "++id, requisicao, nome, justificativa, data_abertura, status",
    });
  }

}

export const db = new DataBase();
