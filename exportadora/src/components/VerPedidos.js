import React, { useState } from "react";
import "./VerPedidos.css";

const VerPedidos = () => {
  const storedFacturas = JSON.parse(localStorage.getItem("facturas")) || [];
  const [facturas, setFacturas] = useState(storedFacturas);

  return (
    <div>
      <h2>Facturas</h2>
      <div className="facturas-container">
        {facturas.map((factura, index) => (
          <div key={index} className="factura">
            <div className="factura-header">
              <strong>
                <span>Factura #{index + 1}</span>
              </strong>
              <span>{factura.fecha}</span>
            </div>
            <div className="cliente-info">
              <div>
                <strong>Cliente:</strong> {factura.nombreCliente}
              </div>
              <div>
                <strong>NIT:</strong> {factura.nit}
              </div>
              <div>
                <strong>Dirección:</strong> {factura.direccion}
              </div>
              <div>
                <strong>Teléfono:</strong> {factura.telefono}
              </div>
              <div>
                <strong>Correo:</strong> {factura.correo}
              </div>
            </div>
            <div className="detalle-factura">
              <div>
                <center>
                  <strong>Cantidad de Cinchos:</strong>{" "}
                  {factura.cantidadCinchos}
                </center>
              </div>
              <div>
                <center>
                  <strong>Total de la factura</strong> Q.
                  {factura.cantidadCinchos * 85}
                </center>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerPedidos;
