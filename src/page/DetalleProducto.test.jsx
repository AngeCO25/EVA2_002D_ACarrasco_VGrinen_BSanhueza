import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import DetalleProducto from "./DetalleProducto";
import { actualizarProducto, formatearPrecio } from "../datos/productos";

// La vista lee el codigo desde la URL, por eso se monta dentro de un router con la ruta real
function montar(codigo, alAgregar = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={["/producto/" + codigo]}>
      <Routes>
        <Route path="/producto/:codigo" element={<DetalleProducto alAgregar={alAgregar} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("DetalleProducto", () => {
  it("muestra los datos del producto segun el codigo de la URL", () => {
    montar("P001");

    expect(screen.getByRole("heading", { name: "Cemento Portland 25 kg" })).toBeInTheDocument();
    expect(screen.getByText("Materiales de construccion")).toBeInTheDocument();
    expect(screen.getByText("Maderas del Sur")).toBeInTheDocument();
    expect(screen.getByText(formatearPrecio(6490))).toBeInTheDocument();
    expect(screen.getByText(/120 unidades/)).toBeInTheDocument();
    expect(screen.getByAltText("Cemento Portland 25 kg")).toBeInTheDocument();
  });

  it("llama a alAgregar con el codigo y muestra el aviso con enlace al carrito", async () => {
    const user = userEvent.setup();
    const alAgregar = vi.fn();

    montar("P003", alAgregar);
    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(alAgregar).toHaveBeenCalledWith("P003");
    expect(screen.getByText("Producto agregado al carrito")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ir al carrito/i })).toHaveAttribute("href", "/carrito");
  });

  it("no muestra el aviso antes de agregar", () => {
    montar("P003");

    expect(screen.queryByText("Producto agregado al carrito")).not.toBeInTheDocument();
  });

  it("ofrece volver al catalogo", () => {
    montar("P001");

    expect(screen.getByRole("link", { name: /volver al catalogo/i })).toHaveAttribute("href", "/");
  });

  it("avisa cuando el producto no existe", () => {
    montar("NOEXISTE");

    expect(screen.getByText("El producto solicitado no existe.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /agregar al carrito/i })).not.toBeInTheDocument();
  });

  it("deshabilita el boton cuando el producto no tiene stock", () => {
    actualizarProducto("P010", { stock: 0 });

    montar("P010");

    expect(screen.getByText("Sin stock disponible")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /agregar al carrito/i })).toBeDisabled();

    // Se restaura el stock original para no afectar a otras pruebas
    actualizarProducto("P010", { stock: 4 });
  });
});
