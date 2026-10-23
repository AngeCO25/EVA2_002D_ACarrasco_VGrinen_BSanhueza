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
- Ver el detalle de cada producto (imagen, categoría, proveedor, precio y stock) y agregarlo al carrito desde esa misma vista
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
| React Router | Navegación entre vistas sin recargar la página y lectura de parámetros de la URL (`useParams`) |
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
│   │   ├── FiltroCategoria.test.jsx
│   │   ├── TarjetaProducto.jsx
│   │   └── TarjetaProducto.test.jsx
│   ├── page/                     Vistas completas de la aplicación
│   │   ├── Catalogo.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── DetalleProducto.test.jsx
│   │   ├── Carrito.jsx
│   │   └── Registro.jsx
│   ├── datos/                    Fuente de datos y persistencia
│   │   ├── productos.js
│   │   ├── productos.test.js
│   │   ├── carrito.js
│   │   └── carrito.test.js
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

## Vista de detalle de producto

La vista `src/page/DetalleProducto.jsx` muestra la información completa de un
producto y permite agregarlo al carrito. Se llega a ella desde el botón
"Ver detalle" de cada tarjeta del catálogo.

- Lee el código del producto desde la URL (`/producto/:codigo`) con `useParams`
  y lo busca con `buscarProducto`.
- Muestra la imagen, la categoría, el nombre, el proveedor, el código, el precio
  y el stock disponible.
- El botón "Agregar al carrito" llama a `alAgregar` (la misma función que usa el
  catálogo), por lo que el contador del carrito en el encabezado se actualiza.
  Después de agregar aparece un aviso con un enlace "Ir al carrito".
- Si el código de la URL no corresponde a ningún producto, muestra un mensaje de
  aviso y un enlace para volver al catálogo.
- Si el producto no tiene stock, muestra "Sin stock disponible" y deshabilita el
  botón de agregar.
- Incluye un enlace "Volver al catalogo" en la parte superior.

## Pruebas unitarias

```
npm test
```

Para ejecutar solo las pruebas de la vista de detalle:

```
npx vitest run src/page/DetalleProducto.test.jsx
```

Para ver el informe de cobertura:

```
npx vitest run --coverage
```

El proyecto exige un mínimo de 80% de cobertura en líneas, funciones,
ramas y sentencias.

### Pruebas de DetalleProducto

El archivo `src/page/DetalleProducto.test.jsx` monta la vista dentro de un
`MemoryRouter` con la ruta `/producto/:codigo` y verifica:

- Que se muestren los datos del producto según el código de la URL
- Que el botón llame a `alAgregar` con el código del producto y aparezca el aviso
  con el enlace al carrito
- Que el aviso no aparezca antes de agregar
- Que exista el enlace para volver al catálogo
- Que se muestre el mensaje correspondiente cuando el producto no existe
- Que el botón quede deshabilitado cuando el producto no tiene stock

## Rutas de la aplicación

| Ruta | Vista |
|---|---|
| `/` | Catálogo de productos |
| `/producto/:codigo` | Detalle de un producto, con botón para agregarlo al carrito |
| `/carrito` | Carrito de compras |
| `/registro` | Formulario de registro |
