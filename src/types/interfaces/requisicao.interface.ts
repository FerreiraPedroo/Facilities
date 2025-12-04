import { ERequisicaoStatus } from "../enums/requisicao-status.enum";

export interface IRequisicao {
    id: number,
    requisicao: string;
    nome: string,
    justificativa: string,
    data_abertura: string,
    status: ERequisicaoStatus,
}

