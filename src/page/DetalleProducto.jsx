import { useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  buscarProducto,
  nombreCategoria,
  nombreProveedor,
  formatearPrecio
} from "../datos/productos";

export default function DetalleProducto({ alAgregar }) {
  // El codigo del producto viene en la URL: /producto/:codigo
  const { codigo } = useParams();
  const [aviso, setAviso] = useState("");

  const producto = buscarProducto(codigo);

  // Si el codigo de la URL no corresponde a ningun producto se muestra un mensaje
  if (!producto) {
    return (
      <Container>
        <Alert variant="warning">El producto solicitado no existe.</Alert>
        <Link to="/" className="btn btn-warning">Volver al catalogo</Link>
      </Container>
    );
  }

  const sinStock = producto.stock < 1;

  const agregar = () => {
    alAgregar(producto.codigo);
    setAviso("Producto agregado al carrito");
  };

  return (
    <Container>
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
        &larr; Volver al catalogo
      </Link>

      <Row>
        <Col xs={12} md={5} className="mb-4">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded border"
          />
        </Col>

        <Col xs={12} md={7} className="text-start">
          <small className="text-muted">{nombreCategoria(producto.categoria)}</small>
          <h1 className="h3">{producto.nombre}</h1>

          <p className="mb-1">
            Proveedor: <strong>{nombreProveedor(producto.rut)}</strong>
          </p>
          <p className="mb-3 text-muted">Codigo: {producto.codigo}</p>

          <p className="fs-3 fw-bold">{formatearPrecio(producto.precio)}</p>

          <p>
            {sinStock
              ? "Sin stock disponible"
              : "Stock disponible: " + producto.stock + " unidades"}
          </p>

          {aviso && (
            <Alert variant="success">
              {aviso}{" "}
              <Link to="/carrito" className="alert-link">Ir al carrito</Link>
            </Alert>
          )}

          <Button variant="warning" disabled={sinStock} onClick={agregar}>
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
