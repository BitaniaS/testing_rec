import React from 'react';
import { Form, Button, FormGroup, FormCheck, FormLabel, FormControl } from 'react-bootstrap';
import './identity.css'; // Import the CSS file here

function Aform() {
  return (
    <Form>
      <FormGroup className="my-form-group">
        <FormLabel className="my-form-label">Which of the following best describes you?</FormLabel>
        <FormCheck type="checkbox" label="Veteran" />
        <FormCheck type="checkbox" label="With Disability" />
        <FormCheck type="checkbox" label="International Student" />
        <FormCheck type="checkbox" label="None of the above" />
      </FormGroup>

      <FormGroup className="my-form-group">
        <FormLabel className="my-form-label">Which Race do you identify with?</FormLabel>
        <FormControl as="select" className="my-form-control">
          <option>African American/Black</option>
          {/* Add other race options here */}
        </FormControl>
      </FormGroup>

      <FormGroup className="my-form-group">
        <FormLabel className="my-form-label">Which Gender Do you identify with?</FormLabel>
        <FormControl as="select" className="my-form-control">
          <option>Female</option>
          {/* Add other gender options here */}
        </FormControl>
      </FormGroup>

      <Button variant="primary" type="submit" className="my-submit-button">
        Submit
      </Button>
    </Form>
  );
}

export default Aform;
