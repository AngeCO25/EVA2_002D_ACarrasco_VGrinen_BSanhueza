import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { nombreCategoria, nombreProveedor, formatearPrecio } from "../datos/productos";

export default function TarjetaProducto({ producto, alAgregar }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
      <Card.Body className="d-flex flex-column">
        <small className="text-muted">{nombreCategoria(producto.categoria)}</small>
        <Card.Title className="h6">{producto.nombre}</Card.Title>
        <Card.Text className="small text-muted mb-1">
          {nombreProveedor(producto.rut)}
        </Card.Text>
        <p className="fw-bold">{formatearPrecio(producto.precio)}</p>

        <div className="mt-auto d-grid gap-2">
          <Button variant="warning" onClick={() => alAgregar(producto.codigo)}>
            Agregar al carrito
          </Button>
          <Link to={"/producto/" + producto.codigo} className="btn btn-outline-secondary btn-sm">
            Ver detalle
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
