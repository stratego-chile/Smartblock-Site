import ContactFormStyles from 'styles/modules/contact-form.module.sass';
import { FormEvent, useState } from 'react';
import { Col, Row, Form, FloatingLabel, Button } from 'react-bootstrap';
import { Smartblock } from 'types';

const ContactForm: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [state, setState] = useState<Smartblock.Types.ContactFormState>({
    isSubmitting: false,
  });

  const handleFormChange = (event: FormEvent) => {
    if (event.isTrusted) {
      const inputElement = event.target as HTMLInputElement;
      setState({
        ...state,
        [inputElement.id as keyof typeof state]: inputElement.value
      });
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (event.isTrusted) {
      return;
    }
  };

  return (
    <Form onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <Row>
        <Col md>
          <FloatingLabel controlId="firstName" label="Nombre" className="mb-3">
            <Form.Control type="text" placeholder="Nombre" />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="lastName" label="Apellido" className="mb-3">
            <Form.Control type="text" placeholder="Apellido" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="email" label="Correo Electrónico" className="mb-3">
            <Form.Control type="email" placeholder="Correo Electrónico" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="message" label="Mensaje" className="mb-3">
            <Form.Control className={ContactFormStyles.messageField} type="text" as="textarea" rows={4} placeholder="Mensaje" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="dark" size="lg" type="submit" className="btn-pill" disabled={state?.isSubmitting}>
            Enviar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm;
