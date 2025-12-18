import { db } from "@/database/db";
import {
  IGetProject,
  IGetProjectList,
  INewProject,
} from "@/types/interfaces/Project/project.interface";

export class ProjectRepository {
  static dataBase = db;

  static async getProjects(): Promise<IGetProjectList[]> {
    const projectsList = await this.dataBase.projects.toArray();
    const unitsList = await this.dataBase.unit.toArray();

    const projetsInfo: IGetProjectList[] = projectsList.map((project) => {
      return {
        ...project,
        unit: unitsList.find((u) => u.id == project.unit_id) ?? null,
      };
    });

    return projetsInfo;
  }

  static async getProjectById(projectId: number): Promise<IGetProject> {
    const project = await this.dataBase.projects.get({ id: Number(projectId) });

    if (!project) {
      throw new Error("Não foi possivel encontrar os dados projeto.");
    }

    const unit = await this.dataBase.unit.get({ id: project.unit_id });

    const requisitions = await this.dataBase.purchase_requisition
      .where("project_ids")
      .equals(projectId)
      .toArray();

    return { ...project, requisitions, unit: unit ?? null };
  }

  static async saveProject(project: INewProject) {
    try {
      const result = await this.dataBase.projects.add(project);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
