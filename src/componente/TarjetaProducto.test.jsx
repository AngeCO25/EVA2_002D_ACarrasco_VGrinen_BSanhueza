import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import TarjetaProducto from "./TarjetaProducto";
import { formatearPrecio } from "../datos/productos";

const producto = {
  codigo: "P001",
  nombre: "Cemento Portland 25 kg",
  categoria: "CAT001",
  precio: 6490,
  stock: 120,
  rut: "761234560",
  imagen: "/img/prod-cemento.jpg"
};

// El componente usa enlaces, por eso se envuelve en un router para poder probarlo
function montar(alAgregar) {
  return render(
    <MemoryRouter>
      <TarjetaProducto producto={producto} alAgregar={alAgregar} />
    </MemoryRouter>
  );
}

describe("TarjetaProducto", () => {
  it("muestra los datos recibidos por props", () => {
    montar(vi.fn());

    expect(screen.getByText("Cemento Portland 25 kg")).toBeInTheDocument();
    expect(screen.getByText("Maderas del Sur")).toBeInTheDocument();
    expect(screen.getByText(formatearPrecio(6490))).toBeInTheDocument();
  });

  it("llama a alAgregar con el codigo del producto", async () => {
    const user = userEvent.setup();
    const alAgregar = vi.fn();

    montar(alAgregar);
    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(alAgregar).toHaveBeenCalledWith("P001");
  });
});