import { useState, useEffect } from "react";
import {Container, Col, Row, Button} from 'react-bootstrap';
import TablaVentas from "../components/ventas/TablaVentas";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Ventas = () => {

  const [ventasFiltradas, setventasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de productos por página

  // Calcular productos paginados
  const ventasPaginadas = ventasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );


  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const obtenerVentas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/ventas");  
      if (!respuesta.ok) {
        throw new Error("Error al obtener las ventas");
      }
      const datos = await respuesta.json();
      setVentas(datos);
      setventasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }

  const manejarCambioBusqueda = (e) => {
  const texto = e.target.value.toLowerCase();
  setTextoBusqueda(texto);
  
  const filtradas = ventas.filter(
    (venta) =>
      venta.id_cliente == texto ||
      venta.id_empleado == texto ||
      venta.fecha_venta == texto ||
      venta.total_venta == texto
  );
  setventasFiltradas(filtradas);
};

  useEffect(() => {
    obtenerVentas();
  }, []); 
  return (
    <>
    <Container className="mt-4">
        <h4>Ventas</h4>



            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />

        <TablaVentas 
        ventas={ventasPaginadas} 
        cargando={cargando}
          totalElementos={ventas.length} // Total de categorias
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
        />
    </Container>
    </>
  );
}
export default Ventas;