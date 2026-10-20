import { useState } from "react";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  leerCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  calcularTotal
} from "../datos/carrito";
import { buscarProducto, formatearPrecio } from "../datos/productos";

export default function Carrito({ alCambiar }) {
  const [items, setItems] = useState(leerCarrito());
  const [aviso, setAviso] = useState("");

  // Vuelve a leer el carrito y avisa al componente padre para que actualice el contador
  const refrescar = () => {
    setItems(leerCarrito());
    alCambiar();
  };

  const modificar = (codigo, cantidad) => {
    cambiarCantidad(codigo, cantidad);
    refrescar();
  };

  const quitar = (codigo) => {
    quitarDelCarrito(codigo);
    refrescar();
  };

  const pagar = () => {
    vaciarCarrito();
    refrescar();
    setAviso("Compra realizada. Su solicitud fue enviada a los proveedores.");
  };

  if (items.length === 0) {
    return (
      <Container>
        <h1 className="h3 mb-3">Carrito de compras</h1>
        {aviso && <Alert variant="success">{aviso}</Alert>}
        <p>No hay productos en el carrito.</p>
        <Link to="/" className="btn btn-warning">Ir al catalogo</Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="h3 mb-3">Carrito de compras</h1>

      <Table responsive bordered>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const producto = buscarProducto(item.codigo);
            return (
              <tr key={item.codigo}>
                <td>{producto.nombre}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>
                  <Form.Control
                    type="number"
                    aria-label={"Cantidad de " + producto.nombre}
                    value={item.cantidad}
                    min={1}
                    max={producto.stock}
                    style={{ width: "90px" }}
                    onChange={(e) => modificar(item.codigo, e.target.value)}
                  />
                </td>
                <td>{formatearPrecio(producto.precio * item.cantidad)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => quitar(item.codigo)}
                  >
                    Quitar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <h2 className="h5">Total: {formatearPrecio(calcularTotal())}</h2>
        <Button variant="warning" onClick={pagar}>Pagar</Button>
      </div>
    </Container>
  );
}