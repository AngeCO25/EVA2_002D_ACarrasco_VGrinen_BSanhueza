export const categorias = [
  { codigo: "CAT001", nombre: "Materiales de construccion" },
  { codigo: "CAT002", nombre: "Herramientas" },
  { codigo: "CAT003", nombre: "Pinturas" },
  { codigo: "CAT004", nombre: "Materiales electricos" },
  { codigo: "CAT005", nombre: "Ferreteria" }
];

export const proveedores = [
  { rut: "761234560", nombre: "Maderas del Sur", categoria: "CAT001" },
  { rut: "772345674", nombre: "Herramientas Chile", categoria: "CAT002" },
  { rut: "783456788", nombre: "Pinturas Andinas", categoria: "CAT003" },
  { rut: "794567891", nombre: "Electricidad Central", categoria: "CAT004" },
  { rut: "705678901", nombre: "Ferreteria Nacional", categoria: "CAT005" }
];

// Lista base de productos. Funciona como una base de datos simulada.
let productos = [
  { codigo: "P001", nombre: "Cemento Portland 25 kg", categoria: "CAT001", precio: 6490, stock: 120, rut: "761234560", imagen: "/img/prod-cemento.jpg" },
  { codigo: "P002", nombre: "Fierro estriado 8 mm", categoria: "CAT001", precio: 4290, stock: 200, rut: "761234560", imagen: "/img/prod-fierro.jpg" },
  { codigo: "P003", nombre: "Taladro percutor 750W", categoria: "CAT002", precio: 54990, stock: 18, rut: "772345674", imagen: "/img/prod-taladro.jpg" },
  { codigo: "P004", nombre: "Sierra circular 1400W", categoria: "CAT002", precio: 79990, stock: 9, rut: "772345674", imagen: "/img/prod-sierra.jpg" },
  { codigo: "P005", nombre: "Latex interior 1 galon", categoria: "CAT003", precio: 18990, stock: 45, rut: "783456788", imagen: "/img/prod-latex.jpg" },
  { codigo: "P006", nombre: "Esmalte sintetico 1 litro", categoria: "CAT003", precio: 9990, stock: 60, rut: "783456788", imagen: "/img/prod-esmalte.jpg" },
  { codigo: "P007", nombre: "Cable 2.5 mm rollo 100 m", categoria: "CAT004", precio: 32990, stock: 30, rut: "794567891", imagen: "/img/prod-cable.jpg" },
  { codigo: "P008", nombre: "Interruptor simple", categoria: "CAT004", precio: 2490, stock: 150, rut: "794567891", imagen: "/img/prod-interruptor.jpg" },
  { codigo: "P009", nombre: "Set de tornillos 500 pzas", categoria: "CAT005", precio: 8990, stock: 12, rut: "705678901", imagen: "/img/prod-tornillos.jpg" },
  { codigo: "P010", nombre: "Caja de clavos 1 kg", categoria: "CAT005", precio: 3490, stock: 4, rut: "705678901", imagen: "/img/prod-clavos.jpg" }
];

export function listarProductos() {
  return productos;
}

export function buscarProducto(codigo) {
  return productos.find((p) => p.codigo === codigo);
}

export function crearProducto(nuevo) {
  productos = [...productos, nuevo];
  return productos;
}

export function actualizarProducto(codigo, cambios) {
  productos = productos.map((p) =>
    p.codigo === codigo ? { ...p, ...cambios } : p
  );
  return productos;
}

export function eliminarProducto(codigo) {
  productos = productos.filter((p) => p.codigo !== codigo);
  return productos;
}

export function nombreCategoria(codigo) {
  const cat = categorias.find((c) => c.codigo === codigo);
  return cat ? cat.nombre : "Sin categoria";
}

export function nombreProveedor(rut) {
  const prov = proveedores.find((p) => p.rut === rut);
  return prov ? prov.nombre : "Sin proveedor";
}

export function formatearPrecio(valor) {
  return "$" + Math.round(valor).toLocaleString("es-CL");
}