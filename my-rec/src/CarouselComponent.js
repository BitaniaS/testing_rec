import React,{useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CarouselComp.css'
import Results from './results';
import {Row,Col } from 'react-bootstrap';

// Yup validation schema
const optionsSchema = Yup.object().shape({
  internationalStudent: Yup.string()
    .required('Please answer this question'),
  veteranStatus: Yup.string()
    .required('Please answer this question'),
  // incomeBracket: Yup.string()
  //   .required('Please select your income bracket'),
  stateOfResidence: Yup.string()
    .required('Please select your state')
    .notOneOf([''], 'Please select your state'),
  race: Yup.string()
    .required('Please select your race')
    .notOneOf([''], 'Please select your race'),
  minPrice: Yup.number()
    .min(0, 'Minimum price must be greater than or equal to 0')
    .required('Minimum price is required'),
  maxPrice: Yup.number()
    .moreThan(Yup.ref('minPrice'), 'Maximum price must be greater than minimum price')
    .required('Maximum price is required'),
  income: Yup.string()
    .required('Please select an income bracket')
    .notOneOf([''], 'Please select an income bracket'),

  });
  
  // selectedOptions: Yup.array()
  //   .min(1, 'Please select at least one option')
  //   .required('Please select at least one option'),
  //   .required('Please select your Gender')
  //   .notOneOf([''], 'Please select your Gender'),
  //   address: Yup.string().required('Address is required'),
  //   city: Yup.string().required('City is required'),
  //   zip: Yup.string().matches(/^[0-9]{5}$/, 'Invalid zip code').required('Zip code is required'),
  //   state: Yup.string().required('State is required'),




// Formik initial values
const initialValues = {
  internationalStudent: '',  // 'Yes' or 'No'
  veteranStatus: '',         // 'Yes' or 'No'
  stateOfResidence: '',      // US States
  // expectedContribution: '',  // Financial contribution ranges
  // selectedOptions: [],
  race:'',
  // gender:'',
  minPrice:'',
  maxPrice:'',
  income:'',
  // address: '',
  // city: '',
  // zip: '',
  // state: '',
};



 


const QuestionCarousel = () => {
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

  async function sendData(data) {
    try{
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST', // Specifies that this is a POST request
      headers: {
        'Content-Type': 'application/json', // Indicates the content type being sent
      },
      body: JSON.stringify(data), // Converts the data object to a JSON string
    });
  
    if (response.ok) {
      setSubmissionSuccessful(true);
        // const recommendations = await response.json();
        // Now you can set these recommendations to state and display them as needed
    } else {
        // Handle errors
        console.error('Failed to fetch recommendations:', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
  }
  };

  if (submissionSuccessful) {
    console.log('submission successful')
    // Render Results component if submission was successful
    return <Results /> ;
  }

  return (
  <Carousel 
    interval={null} 
    indicators={false} 
    controls={true}
    // prevIcon={<i className="bi bi-arrow-left-circle-fill"></i>}
    // nextIcon={<i className="bi bi-arrow-right-circle-fill"></i>}   
  >

    <Carousel.Item>
      <Formik
        initialValues={initialValues}
        validationSchema={optionsSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await sendData(values);
            console.log(response); // Process the response as needed
            actions.setSubmitting(false); // Set submitting to false after submission
          } catch (error) {
            console.error("Error sending data: ", error);
            actions.setSubmitting(false); // Set submitting to false if there's an error
          }
        }}
        >      

    
        {({ errors, touched,handleChange }) => (
          // <div>
          <Form className='component-car'>

        {/* International Student Status */}
          <div className="form-group">
          <label className='label'>Are you an international student?</label>
          <div className="form-check">
            <Field type="radio" name="internationalStudent" value="Yes" className="form-check-input" id="internationalStudentYes" />
            <label htmlFor="internationalStudentYes" className="form-check-label">Yes</label>
            
            <Field type="radio" name="internationalStudent" value="No" className="form-check-input" id="internationalStudentNo" />
            <label htmlFor="internationalStudentNo" className="form-check-label">No</label>
          </div> 
          {errors.internationalStudent && touched.internationalStudent && (
              <div className="error-message">{errors.internationalStudent}</div>
          )}
          </div>

          <div className="form-group">
          <label htmlFor = 'race' className='label'>Which of the following best describes you .</label>
          <div>
            <Field className = 'form-select' as="select" name="race">
                <option className = 'form-check-label ' value="" label="Select a race" />
                <option className = 'form-check-label ' value="White" label="White" />
                <option className = 'form-check-label ' value="Black " label="Black" />
                <option className = 'form-check-label ' value="NativeAmerican/AlaskaNative" label="Native American/Alaska Native" />
                <option className = 'form-check-label ' value="Asian" label="Asian" />
                <option className = 'form-check-label ' value="NativeHawaiian/OtherPacific" label="Native Hawaiian/Other Pacific" />
                <option className = 'form-check-label ' value="Other" label="Other" />           
            </Field>          
          </div>
          {errors.race && touched.race && (
            <div className="error-message">{errors.race}</div>
          )}
        </div>

        {/* Veteran Status */}
        <div className="form-group">
          <label className='label'>Do you have veteran status?</label>       
          <div className='form-check'>
          <Field type="radio" name="veteranStatus" value="Yes" className="form-check-input" id="veteranStatusYes" />
            <label htmlFor="veteranStatusYes" className="form-check-label">Yes</label>
            
          <Field type="radio" name="veteranStatus" value="No" className="form-check-input" id="veteranStatusNo" />
            <label htmlFor="veteranStatusNo" className="form-check-label">No</label>
          </div>
          {errors.veteranStatus && touched.veteranStatus && (
            <div className="error-message">{errors.veteranStatus}</div>
          )}
        </div>

        {/* Income Bracket */}
        <div className="form-group">
          <label className='label'>Please select your family's annual income bracket.</label>
          <div>
            <Field className = 'form-select' as="select" name="income">
                <option className = 'form-check-label ' value="" label="Select income bracket" />
                <option className = 'form-check-label ' value="0" label="0-30,000" />
                <option className = 'form-check-label ' value="30001 " label="30,001 - 48,000" />
                <option className = 'form-check-label ' value="48001" label="48,001- 75,000" />
                <option className = 'form-check-label ' value="75001" label=" above 75,000"/>           
            </Field>
          </div>
          {errors.income && touched.income && (
            <div className="error-message">{errors.income}</div>
          )}
          </div> 

        {/* State of residency */}
        <div className="form-group">
          <label className='label'>Which State do you currently reside in.</label>
          <div>
            <Field className = 'form-select' as="select" name="stateOfResidence">
                <option className = 'form-check-label ' value="" label="Select State of Residence" />
                <option className='form-check-label' value="AL" label="Alabama" />
                <option className='form-check-label' value="AK" label="Alaska" />
                <option className='form-check-label' value="AZ" label="Arizona" />
                <option className='form-check-label' value="AR" label="Arkansas" />
                <option className='form-check-label' value="CA" label="California" />
                <option className='form-check-label' value="CO" label="Colorado" />
                <option className='form-check-label' value="CT" label="Connecticut" />
                <option className='form-check-label' value="DE" label="Delaware" />
                <option className='form-check-label' value="FL" label="Florida" />
                <option className='form-check-label' value="GA" label="Georgia" />
                <option className='form-check-label' value="HI" label="Hawaii" />
                <option className='form-check-label' value="ID" label="Idaho" />
                <option className='form-check-label' value="IL" label="Illinois" />
                <option className='form-check-label' value="IN" label="Indiana" />
                <option className='form-check-label' value="IA" label="Iowa" />
                <option className='form-check-label' value="KS" label="Kansas" />
                <option className='form-check-label' value="KY" label="Kentucky" />
                <option className='form-check-label' value="LA" label="Louisiana" />
                <option className='form-check-label' value="ME" label="Maine" />
                <option className='form-check-label' value="MD" label="Maryland" />
                <option className='form-check-label' value="MA" label="Massachusetts" />
                <option className='form-check-label' value="MI" label="Michigan" />
                <option className='form-check-label' value="MN" label="Minnesota" />
                <option className='form-check-label' value="MS" label="Mississippi" />
                <option className='form-check-label' value="MO" label="Missouri" />
                <option className='form-check-label' value="MT" label="Montana" />
                <option className='form-check-label' value="NE" label="Nebraska" />
                <option className='form-check-label' value="NV" label="Nevada" />
                <option className='form-check-label' value="NH" label="New Hampshire" />
                <option className='form-check-label' value="NJ" label="New Jersey" />
                <option className='form-check-label' value="NM" label="New Mexico" />
                <option className='form-check-label' value="NY" label="New York" />
                <option className='form-check-label' value="NC" label="North Carolina" />
                <option className='form-check-label' value="ND" label="North Dakota" />
                <option className='form-check-label' value="OH" label="Ohio" />
                <option className='form-check-label' value="OK" label="Oklahoma" />
                <option className='form-check-label' value="OR" label="Oregon" />
                <option className='form-check-label' value="PA" label="Pennsylvania" />
                <option className='form-check-label' value="RI" label="Rhode Island" />
                <option className='form-check-label' value="SC" label="South Carolina" />
                <option className='form-check-label' value="SD" label="South Dakota" />
                <option className='form-check-label' value="TN" label="Tennessee" />
                <option className='form-check-label' value="TX" label="Texas" />
                <option className='form-check-label' value="UT" label="Utah" />
                <option className='form-check-label' value="VT" label="Vermont" />
                <option className='form-check-label' value="VA" label="Virginia" />
                <option className='form-check-label' value="WA" label="Washington" />
                <option className='form-check-label' value="WV" label="West Virginia" />
                <option className='form-check-label' value="WI" label="Wisconsin" />
                <option className='form-check-label' value="WY" label="Wyoming" />
      
            </Field>
          </div>
          {errors.stateOfResidence && touched.stateOfResidence && (
            <div className="error-message">{errors.stateOfResidence}</div>
          )}
        </div>

        {/* Expected Price  */}
        <div className="form-group">
          <label className='label'>What range do you expect to pay per year for total cost of attendance ? </label>
          <div style={{ display: 'flex', alignItems: 'center' }} >

          
              <div>
              <label htmlFor="minPrice" className='form-check-label'> Minimum </label>
              <Field className = 'form-control' name="minPrice" type="number" />           
              {errors.minPrice && touched.minPrice && (
                <div className="error-message">{errors.minPrice}</div>
              )}
              </div>
              <div>
              <label htmlFor="maxPrice" className='form-check-label'>Maximum</label> 
              <Field className= 'form-control' name="maxPrice" type="number" />
              {errors.maxPrice && touched.maxPrice && (
                <div className="error-message">{errors.maxPrice}</div>
              )}
              </div>      
          </div>
        </div>  
          <br></br>
          <button className='submit-button' type="submit">Submit</button>                
          </Form>
          // </div>
        )}
      </Formik>

    </Carousel.Item>

    {/* <Carousel.Item>
      <div>This is two <br></br> This is four</div>
    </Carousel.Item>
    <Carousel.Item>
      <div>This is three</div>
    </Carousel.Item> */}
  </Carousel>
  );
};



export default QuestionCarousel;






























































// // src/components/QuestionCarousel.js

// import React , {useState} from 'react';
// import Carousel from 'react-bootstrap/Carousel'
// // import { Carousel, Form } from 'react-bootstrap';
// import  Form   from 'react-bootstrap/Form';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

// // Define the initial values for the checkboxes
// const initialValues = {
//   selectedOptions: [], // This will store the keys of the selected options in the check box
// };

// // Define the Yup validation schema
// const validationSchema = Yup.object().shape({
//   selectedOptions: Yup.array()
//     .of(Yup.string())
//     .min(1, 'You must select at least one option') // Require at least one option to be selected
//     .required('You must select at least one option'), // Make the selection required
// });





// // const QuestionCarousel = () => {
  
// function QuestionCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
//       <Carousel.Item>
//         <div className="carousel-modal">
//           <h3>Which of the following best describes you ? </h3>
//           <Form>
//             <Form.Group>
//               <Form.Label>Check all that apply.</Form.Label>
//               <Form.Check type="checkbox" label="Veteran" />
//               <Form.Check type="checkbox" label="Family of Veteran" />
//               <Form.Check type="checkbox" label="International Student" />
//               <Form.Check type="checkbox" label="With Disability" />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Which race do you identify with?</Form.Label>
//               <Form.Control as="select">
//                 <option>African American/Black</option>
//                 <option>White</option>
//                 <option>Other</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </div>
//       </Carousel.Item>


//       <Carousel.Item>
//         <div className="carousel-modal">
//           <h3>This is two</h3>
//           <p> this is the second slide </p>
         
//         </div>
//       </Carousel.Item>
//       <Carousel.Item>
//         <div className="carousel-modal">
//           <h3>This is three</h3>
         
//         </div>
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// export default QuestionCarousel;
