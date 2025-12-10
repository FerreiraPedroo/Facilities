import { db } from "./db";

(async () => {
  class Seed {
    static dataBase = db;

    static async start() {
      const result = await Promise.all([
        this.dataBase.categories.bulkAdd([
          { name: "Elétrico" },
          { name: "Cívil" },
          { name: "Marcenaria" },
          { name: "Hidráulico" },
          { name: "Serralheria" },
        ]),
        this.dataBase.sub_categories.bulkAdd([
          { name: "Lâmpadas", category_id: 1 },
          { name: "Reatores", category_id: 1 },
          { name: "Soquetes", category_id: 1 },
          { name: "Cabos", category_id: 1 },
          { name: "Fitas", category_id: 1 },
        ]),
        this.dataBase.unit.bulkAdd([
          { name: "BS-SEDE", alias: "BS - SEDE", zone: "ZN", status: "Ativo" },
          { name: "BS-NHD", alias: "BS - NHD", zone: "ZN", status: "Ativo" },
          {
            name: "BS-PÓLEN",
            alias: "BS - PÓLEN",
            zone: "ZN",
            status: "Ativo",
          },
          {
            name: "BS-CLESAM",
            alias: "BS - CLESAM",
            zone: "ZN",
            status: "Ativo",
          },
          {
            name: "BS-CLESAM-VET",
            alias: "BS - CLESAM - VET",
            zone: "ZN",
            status: "Ativo",
          },
          { name: "BGS", alias: "BG - SHOPPING", zone: "ZO", status: "Ativo" },
          { name: "BGF", alias: "BG - FEIRA", zone: "ZO", status: "Ativo" },
          {
            name: "BG-CLEAM-VET",
            alias: "BG - CLESAM - VET",
            zone: "ZO",
            status: "Ativo",
          },
          { name: "CGI", alias: "CGI", zone: "ZO", status: "Ativo" },
          { name: "CGII", alias: "CGII", zone: "ZO", status: "Ativo" },
          { name: "CGIII", alias: "CGIII", zone: "ZO", status: "Ativo" },
          { name: "CGIV", alias: "CGIV", zone: "ZO", status: "Ativo" },
        ]),
        this.dataBase.item.bulkAdd([
          {
            code: "5.2454",
            name: "CABO FLEXÍVEL ATOX 2,5MM² 750V - PRETO - 100 METROS",
            category_id: 1,
            sub_category_id: 4,
            status: "ATIVO",
          },
          {
            code: "5.2461",
            name: "MÓDULO HDMI 2.0 FÊMEA/FÊMEA",
            category_id: 1,
            sub_category_id: 4,
            status: "ATIVO",
          },
          {
            code: "5.2459",
            name: "MÓDULO TOMADA FLEX 10A E 20A",
            category_id: 1,
            sub_category_id: 4,
            status: "ATIVO",
          },
          {
            code: "5.2474",
            name: "MÓDULO INTERRUPTOR BIPOLAR 10A 250V BRANCO - WEG COMPOSÉ",
            category_id: 1,
            sub_category_id: 4,
            status: "ATIVO",
          },
        ]),
      ]);
      return result;
    }
  }
  const result = await Seed.start();
  console.log(result);
  
})();
