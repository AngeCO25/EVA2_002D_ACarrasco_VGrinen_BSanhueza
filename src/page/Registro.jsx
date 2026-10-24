import { useState } from "react";
import { Container, Card, Form, Row, Col, Button, Alert, ProgressBar } from "react-bootstrap";
import { categorias } from "../datos/productos";
import { regiones, comunasDeRegion } from "../datos/regiones";
import {
  validarRut,
  validarNombre,
  validarCorreo,
  validarTelefono,
  validarSeleccion,
  validarDias,
  validarDireccion,
  validarClaveNueva,
  validarRepetirClave,
  formatearTelefono,
  calcularFuerzaClave,
  PREFIJO_TELEFONO
} from "../datos/validaciones";

const COLOR_FUERZA = { debil: "danger", media: "warning", fuerte: "success" };

const vacio = {
  rut: "",
  nombre: "",
  correo: "",
  telefono: PREFIJO_TELEFONO,
  categoria: "",
  dias: "",
  region: "",
  comuna: "",
  direccion: "",
  clave: "",
  repetirClave: ""
};

// Cada campo con su regla. Todas devuelven "" cuando el valor es correcto
const reglas = {
  rut: validarRut,
  nombre: validarNombre,
  correo: validarCorreo,
  telefono: validarTelefono,
  categoria: validarSeleccion,
  dias: validarDias,
  region: validarSeleccion,
  comuna: validarSeleccion,
  direccion: validarDireccion,
  clave: validarClaveNueva,
  repetirClave: (valor, todos) => validarRepetirClave(valor, todos.clave)
};

function calcularErrores(valores) {
  const errores = {};
  for (const campo in reglas) {
    errores[campo] = reglas[campo](valores[campo], valores);
  }
  return errores;
}

// Grupo de etiqueta + control + pista + mensaje de error
function Campo({ id, etiqueta, pista, error, columnas = 6, children }) {
  return (
    <Col md={columnas}>
      <Form.Group className="mb-3" controlId={id}>
        <Form.Label>{etiqueta}</Form.Label>
        {children}
        <Form.Text muted className="d-block">{pista}</Form.Text>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
}

export default function Registro() {
  const [valores, setValores] = useState(vacio);
  // Un campo solo muestra su error despues de que el usuario lo toca
  const [tocados, setTocados] = useState({});

  const errores = calcularErrores(valores);
  const hayErrores = Object.values(errores).some(Boolean);
  const comunas = comunasDeRegion(valores.region);
  const fuerza = calcularFuerzaClave(valores.clave);

  const cambiar = (e) => {
    const { name, value } = e.target;
    const nuevo = name === "telefono" ? formatearTelefono(value) : value;

    setValores((previos) => {
      const siguiente = { ...previos, [name]: nuevo };
      // Al cambiar de region la comuna anterior deja de ser valida
      if (name === "region") siguiente.comuna = "";
      return siguiente;
    });
    setTocados((previos) => ({ ...previos, [name]: true }));
  };

  const errorDe = (campo) => (tocados[campo] ? errores[campo] : "");

  // Propiedades comunes de todos los controles del formulario
  const control = (campo) => ({
    name: campo,
    value: valores[campo],
    onChange: cambiar,
    isInvalid: Boolean(errorDe(campo)),
    isValid: Boolean(tocados[campo]) && !errorDe(campo)
  });

  const enviar = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="text-start">
      <Card className="mb-4">
        <Card.Header as="h1" className="h5">Registro de proveedor</Card.Header>
        <Card.Body>
          <p className="text-muted">
            Este formulario es para empresas que quieren ser proveedoras de
            CompraSegura. La cuenta queda pendiente hasta que el administrador
            la apruebe.
          </p>

          <Form noValidate onSubmit={enviar}>
            <Row>
              <Campo id="rut" etiqueta="RUT" error={errorDe("rut")}
                pista="Sin puntos ni guion. Ejemplo: 761234560">
                <Form.Control type="text" maxLength={9} autoComplete="off" {...control("rut")} />
              </Campo>

              <Campo id="nombre" etiqueta="Nombre o razon social" error={errorDe("nombre")}
                pista="Letras, numeros y puntos.">
                <Form.Control type="text" maxLength={100} autoComplete="organization" {...control("nombre")} />
              </Campo>

              <Campo id="correo" etiqueta="Correo" error={errorDe("correo")}
                pista="Correo de contacto de la empresa. Ejemplo: contacto@empresa.cl">
                <Form.Control type="email" maxLength={100} autoComplete="email" {...control("correo")} />
              </Campo>

              <Campo id="telefono" etiqueta="Telefono" error={errorDe("telefono")}
                pista="Escriba los 9 digitos despues del +56. Ejemplo: +56 912345678">
                <Form.Control type="tel" inputMode="tel" maxLength={13} autoComplete="tel-national" {...control("telefono")} />
              </Campo>

              <Campo id="categoria" etiqueta="Categoria que provee" error={errorDe("categoria")}
                pista="Rubro principal de la empresa.">
                <Form.Select {...control("categoria")}>
                  <option value="">Seleccione una categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.codigo} value={cat.codigo}>{cat.nombre}</option>
                  ))}
                </Form.Select>
              </Campo>

              <Campo id="dias" etiqueta="Dias de entrega" error={errorDe("dias")}
                pista="Plazo habitual, entre 1 y 60 dias.">
                <Form.Control type="number" min={1} max={60} {...control("dias")} />
              </Campo>

              <Campo id="region" etiqueta="Region" error={errorDe("region")}
                pista="Al elegir region se cargan sus comunas.">
                <Form.Select {...control("region")}>
                  <option value="">Seleccione una region</option>
                  {regiones.map((r) => (
                    <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                  ))}
                </Form.Select>
              </Campo>

              <Campo id="comuna" etiqueta="Comuna" error={errorDe("comuna")}
                pista="Depende de la region elegida.">
                <Form.Select {...control("comuna")}>
                  <option value="">Seleccione una comuna</option>
                  {comunas.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Campo>

              <Campo id="direccion" etiqueta="Direccion" error={errorDe("direccion")}
                pista="Calle y numero." columnas={12}>
                <Form.Control type="text" maxLength={300} autoComplete="street-address" {...control("direccion")} />
              </Campo>

              <Campo id="clave" etiqueta="Contrasena" error={errorDe("clave")}
                pista="Entre 8 y 10 caracteres, con mayuscula, minuscula y numero.">
                <Form.Control type="password" maxLength={10} autoComplete="new-password" {...control("clave")} />
                {fuerza.nivel && (
                  <div className="mt-2">
                    <ProgressBar
                      now={fuerza.porcentaje}
                      variant={COLOR_FUERZA[fuerza.nivel]}
                      style={{ height: 6 }}
                      aria-label="Fuerza de la contrasena"
                    />
                    <small>{fuerza.texto}</small>
                  </div>
                )}
              </Campo>

              <Campo id="repetirClave" etiqueta="Repetir contrasena" error={errorDe("repetirClave")}
                pista="Debe ser igual a la anterior.">
                <Form.Control type="password" maxLength={10} autoComplete="new-password" {...control("repetirClave")} />
              </Campo>
            </Row>

            <Button type="submit" variant="warning" className="w-100" disabled={hayErrores}>
              Enviar solicitud de registro
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
