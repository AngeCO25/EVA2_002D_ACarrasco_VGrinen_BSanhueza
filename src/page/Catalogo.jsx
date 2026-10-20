import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import FiltroCategoria from "../componente/FiltroCategoria";
import TarjetaProducto from "../componente/TarjetaProducto";
import { listarProductos } from "../datos/productos";

export default function Catalogo({ alAgregar }) {
  const [categoria, setCategoria] = useState("");
  const [aviso, setAviso] = useState("");

  // Si no hay categoria elegida se muestran todos los productos
  const productos = listarProductos().filter(
    (p) => categoria === "" || p.categoria === categoria
  );

  const agregar = (codigo) => {
    alAgregar(codigo);
    setAviso("Producto agregado al carrito");
  };

  return (
    <Container>
      <h1 className="h3 mb-3">Catalogo de productos</h1>

      <FiltroCategoria valor={categoria} alCambiar={setCategoria} />

      {aviso && <Alert variant="success">{aviso}</Alert>}

      <p className="text-muted">{productos.length} productos disponibles</p>

      <Row>
        {productos.map((producto) => (
          <Col xs={12} md={6} lg={3} key={producto.codigo} className="mb-4">
            <TarjetaProducto producto={producto} alAgregar={agregar} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}