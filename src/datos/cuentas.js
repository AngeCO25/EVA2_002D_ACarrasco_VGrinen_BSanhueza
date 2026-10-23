import { proveedores } from "./productos";

const CLAVE = "cuentasNuevas";

export function leerCuentas() {
  const dato = localStorage.getItem(CLAVE);
  return dato ? JSON.parse(dato) : [];
}

// Revisa que el RUT o el correo no esten usados por un proveedor ni por otra cuenta
export function yaExiste(rut, correo) {
  const enProveedores = proveedores.some((p) => p.rut === rut);
  const enCuentas = leerCuentas().some((c) => c.rut === rut || c.correo === correo);

  return enProveedores || enCuentas;
}

// La cuenta queda en estado Pendiente hasta que el administrador la apruebe
export function guardarCuenta(datos) {
  const nueva = { ...datos, perfil: "proveedor", estado: "Pendiente" };

  localStorage.setItem(CLAVE, JSON.stringify([...leerCuentas(), nueva]));
  return nueva;
}
