import { IPurchaseRequisition } from "./purchase_requisition.interface";
import { IUnit } from "./unit.interface";

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
