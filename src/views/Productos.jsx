import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [productosFiltrados, setproductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de productos por página

  // Calcular productos paginados
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );



  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/productos");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los productos");
      }
      const datos = await respuesta.json();
      setProductos(datos);
      setproductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto) ||
        producto.id_categoria == texto ||
        producto.stock == texto ||
        producto.precio_nitario == texto
    );
    setproductosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);
  return (
    <>
    <Container className="mt-4">
        <h4>Productos</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaProductos 
        productos={productosPaginados} 
        cargando={cargando}
          totalElementos={productos.length} // Total de categorias
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página

        />
    </Container>
    </>
  );
}
export default Productos;