import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ totalCarrito }) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">CompraSegura</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Catalogo</Nav.Link>
            <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
            <Nav.Link as={Link} to="/carrito">
              Carrito <Badge bg="warning" text="dark">{totalCarrito}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}