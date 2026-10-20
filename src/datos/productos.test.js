import { describe, it, expect } from "vitest";
import {
  listarProductos,
  buscarProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  nombreCategoria,
  nombreProveedor,
  formatearPrecio
} from "./productos";

const nuevo = {
  codigo: "P999",
  nombre: "Producto de prueba",
  categoria: "CAT001",
  precio: 1000,
  stock: 5,
  rut: "761234560",
  imagen: "/img/prod-cemento.jpg"
};

describe("productos", () => {
  it("lista los diez productos iniciales", () => {
    expect(listarProductos()).toHaveLength(10);
  });

  it("encuentra un producto por su codigo", () => {
    expect(buscarProducto("P001").nombre).toBe("Cemento Portland 25 kg");
  });

  it("devuelve indefinido si el codigo no existe", () => {
    expect(buscarProducto("NOEXISTE")).toBeUndefined();
  });

  it("crea un producto nuevo", () => {
    crearProducto(nuevo);
    expect(buscarProducto("P999")).toBeDefined();
  });

  it("actualiza el precio de un producto", () => {
    actualizarProducto("P999", { precio: 2500 });
    expect(buscarProducto("P999").precio).toBe(2500);
  });

  it("elimina un producto existente", () => {
    eliminarProducto("P999");
    expect(buscarProducto("P999")).toBeUndefined();
  });

  it("entrega el nombre de la categoria", () => {
    expect(nombreCategoria("CAT002")).toBe("Herramientas");
  });

  it("avisa cuando la categoria no existe", () => {
    expect(nombreCategoria("XXX")).toBe("Sin categoria");
  });

  it("entrega el nombre del proveedor", () => {
    expect(nombreProveedor("761234560")).toBe("Maderas del Sur");
  });

  it("avisa cuando el proveedor no existe", () => {
    expect(nombreProveedor("000000000")).toBe("Sin proveedor");
  });

  it("formatea el precio con signo peso", () => {
    expect(formatearPrecio(6490).startsWith("$")).toBe(true);
  });
});