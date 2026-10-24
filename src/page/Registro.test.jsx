import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import Registro from "./Registro";

const boton = () => screen.getByRole("button", { name: /enviar solicitud/i });

// Completa todos los campos con datos validos; el RUT se puede cambiar
async function llenarFormulario(user, rut = "1000005K") {
  await user.type(screen.getByLabelText(/^rut$/i), rut);
  await user.type(screen.getByLabelText(/nombre o razon social/i), "Nueva SpA");
  await user.type(screen.getByLabelText(/^correo$/i), "contacto@nueva.cl");
  await user.type(screen.getByLabelText(/^telefono$/i), "912345678");
  await user.selectOptions(screen.getByLabelText(/categoria que provee/i), "CAT002");
  await user.type(screen.getByLabelText(/dias de entrega/i), "15");
  await user.selectOptions(screen.getByLabelText(/^region$/i), "Region de Atacama");
  await user.selectOptions(screen.getByLabelText(/^comuna$/i), "Copiapo");
  await user.type(screen.getByLabelText(/^direccion$/i), "Calle Larga 123");
  await user.type(screen.getByLabelText(/^contrasena$/i), "Clave1234");
  await user.type(screen.getByLabelText(/repetir contrasena/i), "Clave1234");
}

describe("Registro", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra el formulario con el boton de enviar deshabilitado", () => {
    render(<Registro />);

    expect(screen.getByRole("heading", { name: /registro de proveedor/i })).toBeInTheDocument();
    expect(boton()).toBeDisabled();
  });

  it("muestra el error de un campo despues de escribir un valor invalido", async () => {
    const user = userEvent.setup();
    render(<Registro />);

    await user.type(screen.getByLabelText(/^rut$/i), "123");

    expect(screen.getByText(/entre 7 y 9 caracteres/i)).toBeInTheDocument();
  });

  it("deja solo numeros en el telefono y conserva el prefijo +56", async () => {
    const user = userEvent.setup();
    render(<Registro />);
    const telefono = screen.getByLabelText(/^telefono$/i);

    expect(telefono).toHaveValue("+56 ");
    await user.type(telefono, "9ab1");

    expect(telefono).toHaveValue("+56 91");
  });

  it("carga las comunas al elegir una region y las limpia al cambiarla", async () => {
    const user = userEvent.setup();
    render(<Registro />);
    const region = screen.getByLabelText(/^region$/i);
    const comuna = screen.getByLabelText(/^comuna$/i);

    await user.selectOptions(region, "Region de Atacama");
    expect(screen.getByRole("option", { name: "Copiapo" })).toBeInTheDocument();

    await user.selectOptions(comuna, "Copiapo");
    await user.selectOptions(region, "Region del Maule");

    expect(comuna).toHaveValue("");
    expect(screen.queryByRole("option", { name: "Copiapo" })).not.toBeInTheDocument();
  });

  it("indica la fuerza de la contrasena mientras se escribe", async () => {
    const user = userEvent.setup();
    render(<Registro />);
    const clave = screen.getByLabelText(/^contrasena$/i);

    await user.type(clave, "abc");
    expect(screen.getByText(/contrasena debil/i)).toBeInTheDocument();

    await user.clear(clave);
    await user.type(clave, "Clave1234");
    expect(screen.getByText(/contrasena fuerte/i)).toBeInTheDocument();
  });

  it("avisa cuando las contrasenas no coinciden", async () => {
    const user = userEvent.setup();
    render(<Registro />);

    await user.type(screen.getByLabelText(/^contrasena$/i), "Clave1234");
    await user.type(screen.getByLabelText(/repetir contrasena/i), "Otra1234");

    expect(screen.getByText(/no coinciden/i)).toBeInTheDocument();
  });

  it("guarda la solicitud y limpia el formulario cuando todo es valido", async () => {
    const user = userEvent.setup();
    render(<Registro />);

    await llenarFormulario(user);
    expect(boton()).toBeEnabled();
    await user.click(boton());

    expect(screen.getByText(/solicitud de nueva spa enviada/i)).toBeInTheDocument();
    const guardadas = JSON.parse(localStorage.getItem("cuentasNuevas"));
    expect(guardadas).toHaveLength(1);
    expect(guardadas[0].estado).toBe("Pendiente");
    expect(screen.getByLabelText(/^rut$/i)).toHaveValue("");
    expect(boton()).toBeDisabled();
  });

  it("rechaza un RUT que ya pertenece a un proveedor", async () => {
    const user = userEvent.setup();
    render(<Registro />);

    await llenarFormulario(user, "761234560");
    await user.click(boton());

    expect(screen.getByText(/ya se encuentra registrado/i)).toBeInTheDocument();
    expect(localStorage.getItem("cuentasNuevas")).toBeNull();
  });

  it("quita el error de duplicado al corregir el RUT", async () => {
    const user = userEvent.setup();
    render(<Registro />);

    await llenarFormulario(user, "761234560");
    await user.click(boton());
    await user.type(screen.getByLabelText(/^rut$/i), "{Backspace}");

    expect(screen.queryByText(/ya se encuentra registrado/i)).not.toBeInTheDocument();
  });
});
