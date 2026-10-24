import { describe, it, expect } from "vitest";
import {
  validarRut,
  validarNombre,
  validarCorreo,
  validarTelefono,
  validarSeleccion,
  validarDias,
  validarDireccion,
  validarClaveNueva,
  validarRepetirClave,
  formatearTelefono,
  calcularFuerzaClave
} from "./validaciones";

describe("validarRut", () => {
  it("acepta un RUT valido, tambien con K", () => {
    expect(validarRut("761234560")).toBe("");
    
    expect(validarRut("1000005k")).toBe("");
  });

  it("rechaza vacio, puntos o guion, largo y caracteres invalidos", () => {
    expect(validarRut("")).not.toBe("");
    expect(validarRut("76.123.456-0")).toMatch(/sin puntos/i);
    expect(validarRut("12345")).toMatch(/entre 7 y 9/i);
    expect(validarRut("76123A560")).toMatch(/solo numeros/i);
  });

  it("rechaza un digito verificador incorrecto", () => {
    expect(validarRut("761234561")).toMatch(/no es valido/i);
  });
});

describe("validarNombre", () => {
  it("acepta letras, numeros y puntos", () => {
    expect(validarNombre("Ferreteria Nacional 2 S.A.")).toBe("");
  });

  it("rechaza vacio, muy corto, muy largo y simbolos", () => {
    expect(validarNombre("")).not.toBe("");
    expect(validarNombre("A")).toMatch(/al menos 2/i);
    expect(validarNombre("a".repeat(101))).toMatch(/100/);
    expect(validarNombre("Empresa #1")).toMatch(/simbolos/i);
  });
});

describe("validarCorreo", () => {
  it("acepta un correo correcto", () => {
    expect(validarCorreo("contacto@empresa.cl")).toBe("");
  });

  it.each([
    ["", /ingrese/i],
    ["a".repeat(100) + "@x.cl", /100/],
    ["con espacio@x.cl", /espacios/i],
    ["sinarroba.cl", /un solo arroba/i],
    ["@empresa.cl", /falta el nombre/i],
    [".ana@empresa.cl", /punto/i],
    ["a..b@empresa.cl", /dos puntos/i],
    ["a#b@empresa.cl", /solo letras/i],
    ["ana@", /falta el dominio/i],
    ["ana@-empresa.cl", /guion/i],
    ["ana@empresa", /no es valido/i]
  ])("rechaza %j", (valor, mensaje) => {
    expect(validarCorreo(valor)).toMatch(mensaje);
  });
});

describe("validarTelefono", () => {
  it("acepta 9 digitos que empiezan en 9, con o sin prefijo", () => {
    expect(validarTelefono("+56 912345678")).toBe("");
    expect(validarTelefono("912345678")).toBe("");
  });

  it("rechaza vacio o formato incorrecto", () => {
    expect(validarTelefono("+56 ")).toMatch(/ingrese/i);
    expect(validarTelefono("+56 812345678")).toMatch(/9 digitos/i);
    expect(validarTelefono("+56 91234")).toMatch(/9 digitos/i);
  });
});

describe("validarSeleccion, validarDias y validarDireccion", () => {
  it("seleccion", () => {
    expect(validarSeleccion("")).not.toBe("");
    expect(validarSeleccion("CAT001")).toBe("");
  });

  it("dias", () => {
    expect(validarDias("")).not.toBe("");
    expect(validarDias("2.5")).toMatch(/entero/i);
    expect(validarDias("0")).toMatch(/entre 1 y 60/i);
    expect(validarDias("61")).toMatch(/entre 1 y 60/i);
    expect(validarDias("15")).toBe("");
  });

  it("direccion", () => {
    expect(validarDireccion("")).not.toBe("");
    expect(validarDireccion("a".repeat(301))).toMatch(/300/);
    expect(validarDireccion("Av. Siempre Viva 742")).toBe("");
  });
});

describe("validarClaveNueva y validarRepetirClave", () => {
  it("acepta una clave con largo, mayuscula, minuscula y numero", () => {
    expect(validarClaveNueva("Clave1234")).toBe("");
  });

  it.each([
    ["", /ingrese/i],
    ["Cl1", /entre 8 y 10/i],
    ["clave12345", /mayuscula/i],
    ["CLAVE12345", /minuscula/i],
    ["ClaveClave", /numero/i]
  ])("rechaza %j", (valor, mensaje) => {
    expect(validarClaveNueva(valor)).toMatch(mensaje);
  });

  it("repetir clave compara con la original", () => {
    expect(validarRepetirClave("", "Clave1234")).toMatch(/repita/i);
    expect(validarRepetirClave("Otra1234", "Clave1234")).toMatch(/no coinciden/i);
    expect(validarRepetirClave("Clave1234", "Clave1234")).toBe("");
  });
});

describe("formatearTelefono", () => {
  it("agrega el prefijo +56 si falta", () => {
    expect(formatearTelefono("")).toBe("+56 ");
    expect(formatearTelefono("912345678")).toBe("+56 912345678");
  });

  it("quita letras y simbolos", () => {
    expect(formatearTelefono("+56 9ab1-2")).toBe("+56 912");
  });

  it("no repite el 56 y limita a 9 digitos", () => {
    expect(formatearTelefono("56912345678")).toBe("+56 912345678");
    expect(formatearTelefono("+56 9123456789999")).toBe("+56 912345678");
  });

  it("recupera el prefijo si el usuario intenta borrarlo", () => {
    expect(formatearTelefono("+56")).toBe("+56 ");
  });
});

describe("calcularFuerzaClave", () => {
  it("no muestra nada con la clave vacia", () => {
    expect(calcularFuerzaClave("").nivel).toBe("");
  });

  it("clasifica en debil, media y fuerte", () => {
    expect(calcularFuerzaClave("abc").nivel).toBe("debil");
    expect(calcularFuerzaClave("Abcdefgh").nivel).toBe("media");
    expect(calcularFuerzaClave("Clave1234").nivel).toBe("fuerte");
    expect(calcularFuerzaClave("Clave1234").porcentaje).toBe(100);
  });
});
