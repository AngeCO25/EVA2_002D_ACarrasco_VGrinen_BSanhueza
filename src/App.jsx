import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componente/Header";
import Catalogo from "./page/Catalogo";
import { agregarAlCarrito, contarItems } from "./datos/carrito";

export default function App() {
  const [total, setTotal] = useState(contarItems());

  const agregar = (codigo) => {
    agregarAlCarrito(codigo);
    setTotal(contarItems());
  };

  return (
    <BrowserRouter>
      <Header totalCarrito={total} />
      <Routes>
        <Route path="/" element={<Catalogo alAgregar={agregar} />} />
      </Routes>
    </BrowserRouter>
  );
}