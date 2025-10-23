import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Tablaclientes from "../components/clientes/Tablaclientes";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Clientes = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [clientesFiltrados, setclientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/clientes");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los clientes");
      }
      const datos = await respuesta.json();
      setClientes(datos);
      setclientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = clientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        cliente.segundo_nombre.toLowerCase().includes(texto) ||
        cliente.primer_apellido.toLowerCase().includes(texto) ||
        cliente.segundo_apellido.toLowerCase().includes(texto) ||
        cliente.direccion.toLowerCase().includes(texto) ||
        cliente.cedula.toLowerCase().includes(texto) ||
        cliente.celular.toLowerCase().includes(texto)
    );
    setclientesFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);
  
  return (
    <>
    <Container className="mt-4">
        <h4>Clientes</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <Tablaclientes 
        clientes={clientesFiltrados} 
        cargando={cargando}
        />
    </Container>
    </>
  );


}
export default Clientes;