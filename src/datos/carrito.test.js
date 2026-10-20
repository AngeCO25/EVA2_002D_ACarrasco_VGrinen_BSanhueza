import { describe, it, expect, beforeEach } from "vitest";
import {
  leerCarrito,
  agregarAlCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  contarItems,
  calcularTotal
} from "./carrito";

describe("carrito", () => {
  // Antes de cada prueba se limpia el almacenamiento para partir desde cero
  beforeEach(() => {
    localStorage.clear();
  });

  it("parte vacio cuando no hay nada guardado", () => {
    expect(leerCarrito()).toEqual([]);
  });

  it("agrega un producto nuevo con cantidad uno", () => {
    agregarAlCarrito("P001");

    const lista = leerCarrito();
    expect(lista).toHaveLength(1);
    expect(lista[0].cantidad).toBe(1);
  });

  it("suma la cantidad si el producto ya estaba", () => {
    agregarAlCarrito("P001");
    agregarAlCarrito("P001");

    expect(leerCarrito()[0].cantidad).toBe(2);
  });

  it("no permite una cantidad mayor al stock disponible", () => {
    agregarAlCarrito("P010");
    cambiarCantidad("P010", 999);

    // El producto P010 tiene stock 4
    expect(leerCarrito()[0].cantidad).toBe(4);
  });

  it("quita un producto del carrito", () => {
    agregarAlCarrito("P001");
    agregarAlCarrito("P003");
    quitarDelCarrito("P001");

    const lista = leerCarrito();
    expect(lista).toHaveLength(1);
    expect(lista[0].codigo).toBe("P003");
  });

  it("calcula el total multiplicando precio por cantidad", () => {
    agregarAlCarrito("P001");
    cambiarCantidad("P001", 3);

    // P001 cuesta 6490
    expect(calcularTotal()).toBe(19470);
  });

  it("cuenta la cantidad total de unidades", () => {
    agregarAlCarrito("P001");
    agregarAlCarrito("P003");
    cambiarCantidad("P003", 2);

    expect(contarItems()).toBe(3);
  });

  it("deja el carrito vacio al vaciarlo", () => {
    agregarAlCarrito("P001");
    vaciarCarrito();

    expect(leerCarrito()).toEqual([]);
  });
});