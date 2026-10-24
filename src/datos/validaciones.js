// Cada validador recibe el valor del campo y devuelve un mensaje de error.
// Si el valor es correcto devuelve "" (texto vacio).

function digitoCorrecto(rut) {
  const cuerpo = rut.slice(0, -1);
  const entregado = rut.slice(-1);
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let esperado = String(resto);
  if (resto === 11) esperado = "0";
  if (resto === 10) esperado = "K";

  return entregado === esperado;
}

export function validarRut(valor) {
  const rut = valor.trim().toUpperCase();

  if (rut === "") return "Ingrese el RUT.";
  if (rut.includes(".") || rut.includes("-")) return "Escriba el RUT sin puntos ni guion.";
  if (rut.length < 7 || rut.length > 9) return "El RUT debe tener entre 7 y 9 caracteres.";
  if (!/^[0-9]+[0-9K]$/.test(rut)) return "Solo numeros y, si corresponde, una K al final.";
  if (!digitoCorrecto(rut)) return "El RUT no es valido, revise el ultimo caracter.";

  return "";
}

export function validarNombre(valor) {
  const texto = valor.trim();

  if (texto === "") return "Ingrese el nombre o razon social.";
  if (texto.length < 2) return "Debe tener al menos 2 caracteres.";
  if (texto.length > 100) return "No puede superar los 100 caracteres.";
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9 .]+$/.test(texto)) return "No se permiten simbolos.";

  return "";
}

export function validarCorreo(valor) {
  const correo = valor.trim().toLowerCase();

  if (correo === "") return "Ingrese un correo.";
  if (correo.length > 100) return "No puede superar los 100 caracteres.";
  if (correo.includes(" ")) return "El correo no puede llevar espacios.";

  const partes = correo.split("@");
  if (partes.length !== 2) return "El correo debe llevar un solo arroba.";

  const [antes, despues] = partes;
  if (antes === "") return "Falta el nombre antes del arroba.";
  if (antes.startsWith(".") || antes.endsWith(".")) return "El nombre no puede empezar ni terminar en punto.";
  if (antes.includes("..")) return "No puede haber dos puntos seguidos.";
  if (!/^[a-z0-9._-]+$/.test(antes)) return "Antes del arroba solo letras, numeros, punto y guion.";

  if (despues === "") return "Falta el dominio despues del arroba.";
  if (despues.startsWith("-") || despues.endsWith("-")) return "El dominio no puede empezar ni terminar en guion.";
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(despues)) return "El dominio no es valido, por ejemplo empresa.cl.";

  return "";
}

export function validarTelefono(valor) {
  const digitos = valor.trim().replace(/^\+?56\s*/, "").replace(/[^0-9]/g, "");

  if (digitos === "") return "Ingrese un telefono.";
  if (!/^9[0-9]{8}$/.test(digitos)) return "Deben ser 9 digitos empezando en 9.";

  return "";
}

export function validarSeleccion(valor) {
  return valor === "" ? "Seleccione una opcion." : "";
}

export function validarDias(valor) {
  if (valor.trim() === "") return "Ingrese los dias de entrega.";

  const dias = Number(valor);
  if (!Number.isInteger(dias)) return "Debe ser un numero entero.";
  if (dias < 1 || dias > 60) return "Debe estar entre 1 y 60 dias.";

  return "";
}

export function validarDireccion(valor) {
  const texto = valor.trim();

  if (texto === "") return "Ingrese la direccion.";
  if (texto.length > 300) return "No puede superar los 300 caracteres.";

  return "";
}

export function validarClaveNueva(valor) {
  if (valor === "") return "Ingrese una contrasena.";
  if (valor.length < 8 || valor.length > 10) return "Debe tener entre 8 y 10 caracteres.";
  if (!/[A-Z]/.test(valor)) return "Debe incluir al menos una mayuscula.";
  if (!/[a-z]/.test(valor)) return "Debe incluir al menos una minuscula.";
  if (!/[0-9]/.test(valor)) return "Debe incluir al menos un numero.";

  return "";
}

// En React no se lee el DOM: la clave original llega como segundo parametro
export function validarRepetirClave(valor, original) {
  if (valor === "") return "Repita la contrasena.";
  if (valor !== original) return "Las contrasenas no coinciden.";

  return "";
}

export const PREFIJO_TELEFONO = "+56 ";

// Mantiene siempre el prefijo +56 y deja solo numeros (maximo 9 digitos)
export function formatearTelefono(valor) {
  let digitos;

  if (valor.startsWith(PREFIJO_TELEFONO)) {
    digitos = valor.slice(PREFIJO_TELEFONO.length).replace(/[^0-9]/g, "");
  } else {
    digitos = valor.replace(/[^0-9]/g, "");
    if (digitos.startsWith("56")) digitos = digitos.slice(2);
  }

  return PREFIJO_TELEFONO + digitos.slice(0, 9);
}

// Cuenta cuantos requisitos cumple la clave: largo, mayuscula, minuscula y numero
export function calcularFuerzaClave(valor) {
  if (valor === "") return { nivel: "", texto: "", porcentaje: 0 };

  const puntos = [
    valor.length >= 8 && valor.length <= 10,
    /[A-Z]/.test(valor),
    /[a-z]/.test(valor),
    /[0-9]/.test(valor)
  ].filter(Boolean).length;

  if (puntos === 4) return { nivel: "fuerte", texto: "Contrasena fuerte", porcentaje: 100 };
  if (puntos === 3) return { nivel: "media", texto: "Contrasena media", porcentaje: 66 };
  return { nivel: "debil", texto: "Contrasena debil", porcentaje: 33 };
}
