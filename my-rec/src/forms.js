import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Define the initial values for the checkboxes
const initialValues = {
  selectedOptions: [], // This will store the keys of the selected options
};

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
  selectedOptions: Yup.array()
    .of(Yup.string())
    .min(1, 'You must select at least one option') // Require at least one option to be selected
    .required('You must select at least one option'), // Make the selection required
});

// Define your component
const MyForm = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
      // Process the form submission here
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <div role="group" aria-labelledby="checkbox-group">
          <label>
            <Field type="checkbox" name="selectedOptions" value="Option1" />
            Option 1
          </label>
          <label>
            <Field type="checkbox" name="selectedOptions" value="Option2" />
            Option 2
          </label>
          <label>
            <Field type="checkbox" name="selectedOptions" value="Option3" />
            Option 3
          </label>
          {/* ... add more checkboxes as needed */}
        </div>
        
        {errors.selectedOptions && touched.selectedOptions ? (
          <div>{errors.selectedOptions}</div>
        ) : null}

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default MyForm;
