import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FiltroCategoria from "./FiltroCategoria";

describe("FiltroCategoria", () => {
  it("muestra las cinco categorias mas la opcion de todas", () => {
    render(<FiltroCategoria valor="" alCambiar={vi.fn()} />);

    expect(screen.getAllByRole("option")).toHaveLength(6);
  });

  it("llama a alCambiar con la categoria elegida", async () => {
    const user = userEvent.setup();
    const alCambiar = vi.fn();

    render(<FiltroCategoria valor="" alCambiar={alCambiar} />);
    await user.selectOptions(screen.getByLabelText(/filtrar por categoria/i), "CAT002");

    expect(alCambiar).toHaveBeenCalledWith("CAT002");
  });
});