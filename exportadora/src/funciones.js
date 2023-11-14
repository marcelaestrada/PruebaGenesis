export const obtenerNombreCliente = (nit) => {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((cliente) => cliente.nit === nit);
  return cliente ? cliente.nombre : "Nombre no encontrado";
};

export const obtenerDireccionCliente = (nit) => {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((cliente) => cliente.nit === nit);
  return cliente ? cliente.direccion : "Dirección no encontrada";
};

export const obtenerTelefonoCliente = (nit) => {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((cliente) => cliente.nit === nit);
  return cliente ? cliente.telefono : "Teléfono no encontrado";
};

export const obtenerCorreoCliente = (nit) => {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((cliente) => cliente.nit === nit);
  return cliente ? cliente.correo : "Correo no encontrado";
};

export const obtenerFechaActual = () => {
  const fecha = new Date();
  return fecha.toLocaleDateString();
};
