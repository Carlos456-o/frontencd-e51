import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCategoria = ({
  mostrarModal,
  setMostrarModal,
  nuevaEmpleado,
  manejarCambioInput,
  agregarEmpleado,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="primerNombre">
            <Form.Label>Primer Nombre del empleado</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevaEmpleado.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Tarcos Tulio"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundo_nombre">
            <Form.Label>Segundo nombre del empleado</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevaEmpleado.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: perez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="primer_apellido">
            <Form.Label>primer apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevaEmpleado.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: suarez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundo_apellido">
            <Form.Label>segundo apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevaEmpleado.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: alvarez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevaEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: 24456789" 
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cargo">
            <Form.Label>cargo</Form.Label>
            <Form.Control
              type="select"
              name="cargo"
              value={nuevaEmpleado.cargo}
              onChange={manejarCambioInput}
              placeholder="Ej: sales manager"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecha_contratacion">
            <Form.Label>Fecha contratacion</Form.Label>
            <Form.Control
              type="DATE"
              name="fecha_contratacion"
              value={nuevaEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              placeholder="Ej: 10/08/2023"
              maxLength={20}
              required
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={!nuevaEmpleado.primer_nombre.trim()}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;
