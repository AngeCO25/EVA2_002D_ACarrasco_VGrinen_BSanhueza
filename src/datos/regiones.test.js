import { describe, it, expect } from "vitest";
import { regiones, comunasDeRegion } from "./regiones";

describe("regiones", () => {
  it("tiene las 16 regiones del pais", () => {
    expect(regiones).toHaveLength(16);
  });

  it("devuelve las comunas de una region existente", () => {
    expect(comunasDeRegion("Region de Atacama")).toContain("Copiapo");
  });

  it("devuelve lista vacia si la region no existe o esta vacia", () => {
    expect(comunasDeRegion("")).toEqual([]);
    expect(comunasDeRegion("Region inventada")).toEqual([]);
  });
});
