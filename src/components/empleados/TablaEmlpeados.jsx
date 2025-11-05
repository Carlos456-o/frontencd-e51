import { Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";


const TablaEmpleados = ({ empleados, cargando,totalElementos,elementosPorPagina,paginaActual,establecerPaginaActual}) => {

  const [orden, setOrden] = useState({ campo: "id_empleado", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const EmpleadosOrdenados = [...empleados].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });


  if (cargando) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>

            <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
              primer nombre
            </BotonOrden>

            <BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
              segundo nombre 
            </BotonOrden>

            <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
              primer nombre 
            </BotonOrden>

            <BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
              segundo nombre
            </BotonOrden>

            <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
              celular
            </BotonOrden>

            <BotonOrden campo="cargo" orden={orden} manejarOrden={manejarOrden}>
              direccion
            </BotonOrden>

            <BotonOrden campo="fecha_contratacion" orden={orden} manejarOrden={manejarOrden}>
              cedula
            </BotonOrden>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {EmpleadosOrdenados.map((empleado) => {
            return (
              <tr key={empleado.id_empleado}>
                <td>{empleado.id_empleado}</td>
                <td>{empleado.primer_nombre}</td>
                <td>{empleado.segundo_nombre}</td>
                <td>{empleado.primer_apellido}</td>
                <td>{empleado.segundo_apellido}</td>
                <td>{empleado.celular}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.fecha_contratacion}</td>
                <td>Acción</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

    </>
  );
}

export default TablaEmpleados;