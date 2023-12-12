// src/components/LandingPage.js

import React, { useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import QuestionCarousel from './CarouselComponent';
import './landing.css'
import Group11 from './Group 11.svg'

function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  const handleStartClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className={`landing-container ${showModal ? 'blur' : ''}`}>
      <div className="text-center">
        <h1>Welcome</h1>
        <p>Click to get your college recommendation</p>
        <Button variant="primary" onClick={handleStartClick}>
          Start
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <QuestionCarousel />
        </Modal.Body>
      </Modal>

      <div>      
         <img src={Group11} alt="Description" className="bottom-left-svg" />
      </div>
    </div>
  );
}

export default LandingPage



// const LandingPage = () => {
//   const [showCarousel, setShowCarousel] = useState(false);

//   const handleStartClick = () => {
//     setShowCarousel(true);
//   };

//   return (
//     <div className="landing-container">
//       <h1>Welcome</h1>
//       <p>Click the start button to get your personalised college recommendation.</p>
//       <Button variant="primary" onClick={handleStartClick}>
//         Start
//       </Button>

//       {showCarousel && (
//         <div className="carousel-overlay">
//           <QuestionCarousel />
//         </div>

//       )}
//       <div>      
//         <img src={Group11} alt="Description" className="bottom-left-svg" />
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
