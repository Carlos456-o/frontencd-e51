import { useState,useEffect } from "react";
import { Container } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmlpeados";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";


const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);


  const [empleadosFiltrados, setempleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");



  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/empleados");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los empleados");
      }
      const datos = await respuesta.json();
      setEmpleados(datos);
      setempleadosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = empleados.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        empleado.segundo_nombre.toLowerCase().includes(texto) ||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        empleado.segundo_apellido.toLowerCase().includes(texto) ||
        empleado.celular.toLowerCase().includes(texto) ||
        empleado.cargo.toLowerCase().includes(texto) ||
        empleado.fecha_contratacion.toLowerCase().includes(texto)
    );
    setempleadosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);
  return (
    <>
    <Container className="mt-4">
        <h4>Empleados</h4> 

            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />



        <TablaEmpleados 
        empleados={empleadosFiltrados} 
        cargando={cargando}
        />
    </Container>
    </>
  );
} 

export default Empleados;