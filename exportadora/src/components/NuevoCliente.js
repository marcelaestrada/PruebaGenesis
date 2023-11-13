import React, { useState } from "react";
import "./NuevoCliente.css";

const AgregarClienteForm = ({ onSubmit }) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    nit: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  const [errores, setErrores] = useState({
    nit: "",
    correo: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    let formValido = true;
    const nuevosErrores = { nit: "", correo: "", telefono: "" };

    if (!/^\d{7}$/.test(cliente.nit)) {
      nuevosErrores.nit =
        "Debe ser un número de 7 dígitos, no debe colocarle el - (ej. 6037956)";
      formValido = false;
    }

    if (!/^.+@.+\..+$/.test(cliente.correo)) {
      nuevosErrores.correo = "Debe contener @ y .com";
      formValido = false;
    }

    if (!/^\d{8}$/.test(cliente.telefono)) {
      nuevosErrores.telefono = "Debe ser un número de 8 dígitos (ej. 55144309)";
      formValido = false;
    }

    setErrores(nuevosErrores);
    return formValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      onSubmit(cliente);
      setCliente({
        nombre: "",
        nit: "",
        correo: "",
        telefono: "",
        direccion: "",
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          NIT:
          <input
            type="text"
            name="nit"
            value={cliente.nit}
            onChange={handleChange}
            placeholder="6052968"
          />
          {errores.nit && <span className="error-msg">{errores.nit}</span>}
        </label>

        <label>
          Correo:
          <input
            type="text"
            name="correo"
            value={cliente.correo}
            onChange={handleChange}
            placeholder="correo@gmail.com"
          />
          {errores.correo && (
            <span className="error-msg">{errores.correo}</span>
          )}
        </label>

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            placeholder="36528956"
          />
          {errores.telefono && (
            <span className="error-msg">{errores.telefono}</span>
          )}
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Guardar Cliente</button>
      </form>
    </div>
  );
};

export default AgregarClienteForm;
