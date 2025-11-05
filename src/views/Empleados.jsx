import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmlpeados";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroEmpleados from "../components/empleados/ModalRegistroEmpleados";


const Empleados = () => {

  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [empleadosFiltrados, setempleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de productos por página

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: ''
  });

  // Calcular productos paginados
  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );


  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({ ...prev, [name]: value }));
  };

  const agregarEmpleado = async () => {
  if (!nuevoEmpleado.primer_nombre.trim()) return;

  try {
    const respuesta = await fetch('http://localhost:3000/api/registrarempleado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEmpleado)
    });

    if (!respuesta.ok) throw new Error('Error al guardar');

    // Limpiar y cerrar
    setNuevaCategoria({ primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: '' });
    setMostrarModal(false);
    await obtenerEmpleados(); // Refresca la lista
  } catch (error) {
    console.error("Error al agregar el empleado:", error);
    alert("No se pudo guardar el empleado. Revisa la consola.");
  }
};


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

        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => setMostrarModal(true)}
          >
            + Nueva Categoría
          </Button>
        </Col>


        <TablaEmpleados
          empleados={empleadosPaginados}
          cargando={cargando}
          totalElementos={empleados.length} // Total de categorias
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
        />

        <ModalRegistroEmpleados
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
        />

    </Container>
    </>
  );
} 

export default Empleados;