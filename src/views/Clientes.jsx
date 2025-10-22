import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Tablaclientes from "../components/clientes/Tablaclientes";

const Clientes = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/clientes");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los clientes");
      }
      const datos = await respuesta.json();
      setClientes(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <>
    <Container className="mt-4">
        <h4>Clientes</h4>
        <Tablaclientes 
        clientes={clientes} 
        cargando={cargando}
        />
    </Container>
    </>
  );


}
export default Clientes;