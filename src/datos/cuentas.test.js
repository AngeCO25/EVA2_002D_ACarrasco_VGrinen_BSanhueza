import { describe, it, expect, beforeEach } from "vitest";
import { leerCuentas, yaExiste, guardarCuenta } from "./cuentas";

const datos = { rut: "1000005K", correo: "nuevo@empresa.cl", nombre: "Nueva SpA" };

describe("cuentas", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("parte vacio cuando no hay cuentas guardadas", () => {
    expect(leerCuentas()).toEqual([]);
  });

  it("guarda la cuenta como proveedor pendiente", () => {
    const nueva = guardarCuenta(datos);

    expect(nueva.perfil).toBe("proveedor");
    expect(nueva.estado).toBe("Pendiente");
    expect(leerCuentas()).toHaveLength(1);
  });

  it("detecta un RUT que ya es proveedor", () => {
    expect(yaExiste("761234560", "otro@empresa.cl")).toBe(true);
  });

  it("detecta RUT o correo de una cuenta ya registrada", () => {
    guardarCuenta(datos);

    expect(yaExiste("1000005K", "otro@empresa.cl")).toBe(true);
    expect(yaExiste("999999999", "nuevo@empresa.cl")).toBe(true);
  });

  it("deja pasar un RUT y correo nuevos", () => {
    expect(yaExiste("1000005K", "nuevo@empresa.cl")).toBe(false);
  });
});
