import { db } from "@/database/db";
import { IUnit } from "@/types/interfaces/unit.interface";

export class UnitRepository {
  static database = db;

  static async getUnitById(unitId: number) {
    return await this.database.unit.get({ id: Number(unitId) });
  }
  static async getUnitList(): Promise<IUnit[]> {
    return await this.database.unit.toArray();
  }
}
