import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nombre_producto">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_producto"
                  value={productoEditado?.nombre_producto || ''}
                  onChange={manejarCambio}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="id_categoria">
                <Form.Label>ID Categoría</Form.Label>
                <Form.Control
                  type="number"
                  name="id_categoria"
                  value={productoEditado?.id_categoria || ''}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="descripcion_producto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion_producto"
              value={productoEditado?.descripcion_producto || ''}
              onChange={manejarCambio}
              rows={3}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="precio_unitario">
                <Form.Label>Precio Unitario (C$)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="precio_unitario"
                  value={productoEditado?.precio_unitario || ''}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={productoEditado?.stock || ''}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>URL Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={productoEditado?.imagen || ''}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!productoEditado?.nombre_producto?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
