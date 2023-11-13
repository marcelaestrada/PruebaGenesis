import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import RegistrarCliente from "./components/RegistrarCliente.js";
import VerPedidos from "./components/VerPedidos.js";
import OrdenCorteEnsamblaje from "./components/OrdenCorteEnsamblaje.js";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="home-link">
              <p className="titulo-exportadora">Exportadora</p>
            </Link>
          </div>

          <div className="navbar-right">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/registrar-cliente" className="nav-link">
                  Registrar Cliente
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ver-pedidos" className="nav-link">
                  Ver Pedidos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orden-corte-ensamblaje" className="nav-link">
                  Orden de Corte o Ensamblaje
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/registrar-cliente" element={<RegistrarCliente />} />
          <Route path="/ver-pedidos" element={<VerPedidos />} />
          <Route
            path="/orden-corte-ensamblaje"
            element={<OrdenCorteEnsamblaje />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
