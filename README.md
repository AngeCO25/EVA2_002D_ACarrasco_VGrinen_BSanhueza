# CompraSegura - Evaluación Parcial 2

Portal de abastecimiento que conecta a una empresa con sus proveedores.
Esta entrega corresponde a la migración del proyecto desde HTML, CSS y
JavaScript hacia el framework React.

**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Sección:** 002D  

## Integrantes

| Nombre | Rol en el equipo |
|---|---|
| Angela Carrasco 
| Vicente Grinen
| Benjamín Sanhueza 

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
│   │   └── carrito.js
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
