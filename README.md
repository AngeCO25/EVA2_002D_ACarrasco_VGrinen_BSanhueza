# CompraSegura - Evaluación Parcial 2

Portal de abastecimiento que conecta a una empresa con sus proveedores.
Esta entrega corresponde a la migración del proyecto desde HTML, CSS y
JavaScript hacia el framework React.

**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Sección:** 002D  

## Integrantes

| Nombre | Usuario GitHub | Rol en el equipo |
|---|---|---|
| Angela Carrasco | AngeCO25 | Líder de equipo |
| Vicente Grinen | vicentegrinen | Desarrollo |
| Benjamín Sanhueza | benjamin-sz | Desarrollo |

## Contexto del proyecto

CompraSegura es una plataforma de compras para empresas que necesitan
abastecerse de materiales de construcción, herramientas, pinturas,
materiales eléctricos y artículos de ferretería.

La aplicación permite:

- Revisar el catálogo de productos y filtrarlo por categoría
- Ver el detalle de cada producto y su proveedor
- Agregar productos al carrito y modificar las cantidades
- Registrar nuevos usuarios mediante un formulario con validaciones

En la Evaluación Parcial 1 el proyecto se construyó con HTML, CSS y
JavaScript. En esta segunda entrega se reconstruye con React, se
incorpora navegación entre vistas, diseño responsivo con Bootstrap y
pruebas unitarias automatizadas.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React | Construcción de la interfaz por componentes |
| Vite | Creación del proyecto y servidor de desarrollo |
| React Router | Navegación entre vistas sin recargar la página |
| React Bootstrap | Componentes visuales y diseño responsivo |
| localStorage | Persistencia del carrito en el navegador |
| Vitest | Ejecución de las pruebas unitarias |
| Testing Library | Renderizado y consulta de componentes en las pruebas |

## Estructura del proyecto

```
EVA2_002D_ACarrasco_VGrinen_BSanhueza/
├── public/
│   └── img/                      Imágenes de productos y proveedores
├── src/
│   ├── componente/               Piezas reutilizables de la interfaz
│   │   ├── Header.jsx
│   │   ├── FiltroCategoria.jsx
│   │   └── TarjetaProducto.jsx
│   ├── page/                     Vistas completas de la aplicación
│   │   ├── Catalogo.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Carrito.jsx
│   │   └── Registro.jsx
│   ├── datos/                    Fuente de datos y persistencia
│   │   ├── productos.js
│   │   ├── carrito.js
│   │   ├── regiones.js
│   │   ├── regiones.test.js
│   │   ├── validaciones.js
│   │   └── validaciones.test.js
│   ├── App.jsx                   Componente principal y rutas
│   ├── main.jsx                  Punto de entrada
│   └── setupTests.js             Configuración de las pruebas
├── index.html
├── package.json
└── vite.config.js
```

## Instalación

Requiere Node.js instalado.

```
git clone https://github.com/AngeCO25/EVA2_002D_ACarrasco_VGrinen_BSanhueza.git
cd EVA2_002D_ACarrasco_VGrinen_BSanhueza
npm install
```

## Ejecución

```
npm run dev
```

La aplicación queda disponible en http://localhost:5173

## Pruebas unitarias

```
npm test
```

Para ver el informe de cobertura:

```
npx vitest run --coverage
```

El proyecto exige un mínimo de 80% de cobertura en líneas, funciones,
ramas y sentencias.

## Rutas de la aplicación

| Ruta | Vista |
|---|---|
| `/` | Catálogo de productos |
| `/producto/:codigo` | Detalle de un producto |
| `/carrito` | Carrito de compras |
| `/registro` | Formulario de registro |

## Registro de proveedor

El formulario de registro se construye por partes, un commit por cada una.

### Datos de regiones y comunas

El archivo `src/datos/regiones.js` contiene las 16 regiones de Chile con
sus comunas. Exporta:

| Elemento | Descripción |
|---|---|
| `regiones` | Lista de regiones, cada una con su nombre y sus comunas |
| `comunasDeRegion(nombre)` | Devuelve las comunas de una región, o una lista vacía si no existe |

El formulario usa estos datos para que la lista de comunas dependa de la
región elegida. Las pruebas están en `src/datos/regiones.test.js`.

### Validaciones de los campos

El archivo `src/datos/validaciones.js` reúne una función por cada campo del
formulario. Cada una recibe el valor escrito y devuelve el mensaje de error,
o un texto vacío (`""`) si el valor es correcto.

| Función | Qué revisa |
|---|---|
| `validarRut` | Sin puntos ni guion, entre 7 y 9 caracteres y dígito verificador correcto (acepta K) |
| `validarNombre` | Entre 2 y 100 caracteres; solo letras, números, espacios y puntos |
| `validarCorreo` | Un solo arroba, nombre y dominio con formato válido, máximo 100 caracteres |
| `validarTelefono` | 9 dígitos que empiecen en 9, con o sin prefijo +56 |
| `validarSeleccion` | Que se haya elegido una opción en categoría, región y comuna |
| `validarDias` | Número entero entre 1 y 60 |
| `validarDireccion` | No vacía, máximo 300 caracteres |
| `validarClaveNueva` | Entre 8 y 10 caracteres con mayúscula, minúscula y número |
| `validarRepetirClave` | Que coincida con la contraseña original |

Las pruebas están en `src/datos/validaciones.test.js`.