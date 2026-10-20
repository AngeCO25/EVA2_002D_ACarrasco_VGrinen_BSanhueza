import { buscarProducto } from "./productos";

const CLAVE = "carrito";

export function leerCarrito() {
  const dato = localStorage.getItem(CLAVE);
  return dato ? JSON.parse(dato) : [];
}

export function guardarCarrito(lista) {
  // localStorage solo guarda texto, por eso se convierte con JSON.stringify
  localStorage.setItem(CLAVE, JSON.stringify(lista));
  return lista;
}

export function agregarAlCarrito(codigo) {
  const lista = leerCarrito();
  const existente = lista.find((item) => item.codigo === codigo);

  if (existente) {
    existente.cantidad = existente.cantidad + 1;
  } else {
    lista.push({ codigo: codigo, cantidad: 1 });
  }

  return guardarCarrito(lista);
}

export function cambiarCantidad(codigo, cantidad) {
  const producto = buscarProducto(codigo);

  // La cantidad nunca baja de 1 ni supera el stock disponible
  let valida = Number(cantidad);
  if (valida < 1) { valida = 1; }
  if (producto && valida > producto.stock) { valida = producto.stock; }

  const lista = leerCarrito().map((item) =>
    item.codigo === codigo ? { ...item, cantidad: valida } : item
  );

  return guardarCarrito(lista);
}

export function quitarDelCarrito(codigo) {
  const lista = leerCarrito().filter((item) => item.codigo !== codigo);
  return guardarCarrito(lista);
}

export function vaciarCarrito() {
  return guardarCarrito([]);
}

export function contarItems() {
  return leerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
}

export function calcularTotal() {
  return leerCarrito().reduce((suma, item) => {
    const producto = buscarProducto(item.codigo);
    return suma + (producto ? producto.precio * item.cantidad : 0);
  }, 0);
}