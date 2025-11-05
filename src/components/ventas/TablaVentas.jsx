import { Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaVentas = ({ ventas, cargando,totalElementos,elementosPorPagina,paginaActual,establecerPaginaActual}) => {

  const [orden, setOrden] = useState({ campo: "id_venta", direccion: "asc" });
    
      const manejarOrden = (campo) => {
        setOrden((prev) => ({
          campo,
          direccion:
            prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
      };
    
      const VentasOrdenadas = [...ventas].sort((a, b) => {
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
            <BotonOrden campo="id_venta" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>

            <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
              ID cliente
            </BotonOrden>

            <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
              ID empleado
            </BotonOrden>

            <BotonOrden campo="fecha_venta" orden={orden} manejarOrden={manejarOrden}>
              Fecha venta
            </BotonOrden>

            <BotonOrden campo="total_venta" orden={orden} manejarOrden={manejarOrden}>
              Total
            </BotonOrden>
          </tr>
        </thead>
        <tbody>
          {VentasOrdenadas.map((venta) => {
            return (
                <tr key={venta.id_venta}>
                  <td>{venta.id_venta}</td>
                  <td>{venta.id_cliente}</td>
                  <td>{venta.id_empleado}</td>
                  <td>{venta.fecha_venta}</td>
                  <td>{venta.total_venta}</td>
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

export default TablaVentas;