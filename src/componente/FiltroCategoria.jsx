import { Form } from "react-bootstrap";
import { categorias } from "../datos/productos";

export default function FiltroCategoria({ valor, alCambiar }) {
  return (
    <Form.Group className="mb-4">
      <Form.Label htmlFor="filtroCategoria">Filtrar por categoria</Form.Label>
      <Form.Select
        id="filtroCategoria"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
      >
        <option value="">Todas las categorias</option>
        {categorias.map((cat) => (
          <option key={cat.codigo} value={cat.codigo}>
            {cat.nombre}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
