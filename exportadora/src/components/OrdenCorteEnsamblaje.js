import React, { useState, useEffect } from "react";
import {
  obtenerNombreCliente,
  obtenerDireccionCliente,
  obtenerTelefonoCliente,
  obtenerCorreoCliente,
  obtenerFechaActual,
} from "../funciones.js";
import "./OrdenCorteEnsamblaje.css";

const OrdenCorteEnsamblaje = ({ clientes }) => {
  const storedOrders = JSON.parse(localStorage.getItem("ordenes")) || [];
  const [ordenes, setOrdenes] = useState(storedOrders);
  const [nuevoOrden, setNuevoOrden] = useState({
    nitCliente: "",
    estado: "En proceso de corte",
    cantidad: 0,
    capa1: false,
    capa2: false,
    capa3: false,
  });
  const [ensamblarHabilitado, setEnsamblarHabilitado] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    localStorage.setItem("ordenes", JSON.stringify(ordenes));
  }, [ordenes]);

  const handleAgregarOrden = (e) => {
    e.preventDefault();
    if (!nuevoOrden.nitCliente) {
      setErrores({ cliente: "Debe seleccionar a un cliente" });
      return;
    }

    if (nuevoOrden.cantidad <= 0) {
      setErrores({ cantidad: "La cantidad debe ser mayor a 0" });
      return;
    }
    setOrdenes([...ordenes, nuevoOrden]);

    setErrores({});
    setNuevoOrden({
      nitCliente: "",
      estado: "En Proceso de Corte",
      cantidad: 0,
      capa1: false,
      capa2: false,
      capa3: false,
    });
  };

  const handleSelectChange = (e) => {
    setNuevoOrden({ ...nuevoOrden, [e.target.name]: e.target.value });
  };

  const handleCantidadChange = (e) => {
    setNuevoOrden({
      ...nuevoOrden,
      cantidad: parseInt(e.target.value, 10) || 0,
    });
  };

  const handleCheckboxChange = (index, capa) => {
    const updatedOrdenes = [...ordenes];
    updatedOrdenes[index] = {
      ...updatedOrdenes[index],
      [capa]: !updatedOrdenes[index][capa],
    };
    setOrdenes(updatedOrdenes);
  };

  useEffect(() => {
    const todosSeleccionados =
      nuevoOrden.capa1 && nuevoOrden.capa2 && nuevoOrden.capa3;
    setEnsamblarHabilitado(todosSeleccionados);
  }, [nuevoOrden.capa1, nuevoOrden.capa2, nuevoOrden.capa3]);

  const handleEnsamblarClick = (index) => {
    const orden = ordenes[index];

    if (orden.capa1 && orden.capa2 && orden.capa3) {
      const nuevaFactura = {
        nombreCliente: obtenerNombreCliente(orden.nitCliente),
        direccion: obtenerDireccionCliente(orden.nitCliente),
        nit: orden.nitCliente,
        telefono: obtenerTelefonoCliente(orden.nitCliente),
        correo: obtenerCorreoCliente(orden.nitCliente),
        cantidadCinchos: orden.cantidad,
        fecha: obtenerFechaActual(),
      };

      const storedFacturas = JSON.parse(localStorage.getItem("facturas")) || [];
      localStorage.setItem(
        "facturas",
        JSON.stringify([...storedFacturas, nuevaFactura])
      );

      const updatedOrdenes = [...ordenes];
      updatedOrdenes.splice(index, 1);
      setOrdenes(updatedOrdenes);
    }
  };

  return (
    <div className="orden-corte-section">
      <h2>Orden de Corte y Ensamblaje</h2>
      <form onSubmit={handleAgregarOrden}>
        <label>
          NIT del Cliente:
          <select
            name="nitCliente"
            value={nuevoOrden.nitCliente}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Selecciona un cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.nit} value={cliente.nit}>
                {cliente.nit}
              </option>
            ))}
          </select>
          <div className="error-msg">{errores.cliente}</div>
        </label>
        <label>
          Estado:
          <select
            name="estado"
            value={nuevoOrden.estado}
            onChange={handleSelectChange}
          >
            <option value="En proceso de corte">En proceso de corte</option>
            <option value="Listo para ensamblaje">Listo para ensamblaje</option>
          </select>
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={nuevoOrden.cantidad}
            onChange={handleCantidadChange}
          />
          <div className="error-msg">{errores.cantidad}</div>
        </label>
        <button type="submit" className="agregar-orden-btn">
          Agregar orden de corte
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>NIT del Cliente</th>
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Inferior</th>
            <th>Centro</th>
            <th>Superior</th>
            <th>Ensamblaje</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden, index) => (
            <tr key={index}>
              <td>{orden.nitCliente}</td>
              <td>{orden.estado}</td>
              <td>{orden.cantidad}</td>
              <td>
                <input
                  type="checkbox"
                  checked={orden.capa1}
                  onChange={() => handleCheckboxChange(index, "capa1")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={orden.capa2}
                  onChange={() => handleCheckboxChange(index, "capa2")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={orden.capa3}
                  onChange={() => handleCheckboxChange(index, "capa3")}
                />
              </td>
              <td>
                <button
                  className="ensamblar-btn"
                  onClick={() => handleEnsamblarClick(index)}
                  disabled={!orden.capa1 || !orden.capa2 || !orden.capa3}
                >
                  Ensamblar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenCorteEnsamblaje;
