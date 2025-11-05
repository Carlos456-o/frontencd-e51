import { Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";


const TablaCompras = ({ compras, cargando,totalElementos,elementosPorPagina,paginaActual,establecerPaginaActual }) => {

  const [orden, setOrden] = useState({ campo: "id_compra", direccion: "asc" });
  
    const manejarOrden = (campo) => {
      setOrden((prev) => ({
        campo,
        direccion:
          prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
      }));
    };
  
    const ComprasOrdenadas = [...compras].sort((a, b) => {
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
            <BotonOrden campo="id_compra" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>

            <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
              ID empleado
            </BotonOrden>

            <BotonOrden campo="fecha_compra" orden={orden} manejarOrden={manejarOrden}>
              Fecha de la compra
            </BotonOrden>

            <BotonOrden campo="total_compra" orden={orden} manejarOrden={manejarOrden}>
              Total
            </BotonOrden>
          </tr>
        </thead>
        <tbody>
          {ComprasOrdenadas.map((compra) => {
            return (
                <tr key={compra.id_compra}>
                  <td>{compra.id_compra}</td>
                  <td>{compra.id_empleado}</td>
                  <td>{compra.fecha_compra}</td>
                  <td>{compra.total_compra}</td>
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

export default TablaCompras;