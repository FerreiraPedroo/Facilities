import { EItemStatus } from "../enums/item-status.enum";

export interface IItem {
    id: number,
    codigo: string;
    nome: string,
    unidade: string,
    status: EItemStatus,
}
