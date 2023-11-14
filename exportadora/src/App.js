import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import RegistrarCliente from "./components/RegistrarCliente.js";
import VerPedidos from "./components/VerPedidos.js";

localStorage.clear();

const App = () => {
  return (
    <Router>
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
                Orden y ensamblaje
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ver-pedidos" className="nav-link">
                Facturas
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/registrar-cliente" element={<RegistrarCliente />} />
        <Route path="/ver-pedidos" element={<VerPedidos />} />
      </Routes>
    </Router>
  );
};

export default App;
