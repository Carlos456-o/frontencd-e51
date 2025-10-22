import { useState, useEffect } from "react";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import { Container } from "react-bootstrap";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/usuarios");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const datos = await respuesta.json();
      setUsuarios(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }

  useEffect(() => {
    obtenerUsuarios();
  }, []);
  return (
    <>
    <Container className="mt-4">
        <h4>Usuarios</h4>
        <TablaUsuarios 
        usuarios={usuarios} 
        cargando={cargando}
        />
    </Container>
    </>
  );
} 
export default Usuarios;