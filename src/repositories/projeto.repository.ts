import { db } from "@/database/db";
import { INovoProjeto } from "@/types/interfaces/projeto.interface";

export const bancoDeDados = {
  db: db,
  async obterProjetos() {
    const resultado = await db.projetos.toArray();
    console.log(resultado);
    return resultado;
  },
  async adicionarProjeto(projeto: INovoProjeto) {
    const resultado = await db.projetos.add(projeto);
    return resultado;
  },
};
