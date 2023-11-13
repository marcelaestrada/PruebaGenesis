import React, { useState, useEffect } from "react";
import AgregarClienteForm from "./NuevoCliente.js";
import "./RegistrarCliente.css";

const RegistrarCliente = () => {
  const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
  const [clientes, setClientes] = useState(clientesGuardados);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  const handleAgregarCliente = () => {
    setMostrarFormulario(true);
  };

  const handleGuardarCliente = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);
    setMostrarFormulario(false);
  };

  return (
    <div>
      {mostrarFormulario && (
        <AgregarClienteForm onSubmit={handleGuardarCliente} />
      )}

      <button className="agregar-cliente-btn" onClick={handleAgregarCliente}>
        Nuevo cliente
      </button>

      <br></br>
      <h2>Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>NIT</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nombre}</td>
              <td>{cliente.nit}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrarCliente;
