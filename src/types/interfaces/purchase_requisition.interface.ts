export interface IPurchaseRequisition {
  id: number;
  requisition: string;
  name: string;
  justificative: string;
  date_open: string;
  project_ids: number[];
  status: string;
}
