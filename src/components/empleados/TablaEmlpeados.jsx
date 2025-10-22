import { Table, Spinner } from "react-bootstrap";

const TablaEmpleados = ({ empleados, cargando }) => {

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
            <th>ID</th>
            <th>Nombre 1</th>
            <th></th>
            <th>Primer Apellido</th>
            <th>Segundo Aellido</th>
            <th>Celular</th>
            <th>Descripcion Categorias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => {
            return (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nombre_categoria}</td>
                  <td>{categoria.descripcion_categoria}</td>
                  <td>Acción</td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TablaEmpleados;