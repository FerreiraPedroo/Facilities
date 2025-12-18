import { IPurchaseRequisition } from "../purchase_requisition.interface";
import { IUnit } from "../unit.interface";
import z from "zod";

export const projectValidator = z.object({
  code: z.string(),
  classification: z.string(),
  name: z.string(),
  unit_id: z.coerce.number().optional(),
  status: z.enum(["Ativo", "Inativo"]),
  budgets: z
    .array(
      z.object({
        month: z.enum([
          "janeiro",
          "fevereiro",
          "marco",
          "abril",
          "maio",
          "junho",
          "julho",
          "agosto",
          "setembro",
          "outubro",
          "novembro",
          "dezembro",
        ]),
        value: z.coerce.number(),
      })
    )
    .optional()
    .default([]),
  date_open: z.iso.datetime().optional(),
});

export interface IProject {
  id: number;
  code: string;
  classification: string;
  name: string;
  unit_id: number;
  status: string;
  budgets: [number | null];
  date_open: string;
}

interface IBudget {}

export interface INewProject extends IProject {
  budget: IBudget;
}

export interface IGetProjectList extends IProject {
  unit: IUnit | null;
}
export interface IGetProject extends IProject {
  requisitions: IPurchaseRequisition[];
  unit: IUnit | null;
}
