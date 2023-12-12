// src/App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import LandingPage from './landing'; // Update the import path according to your project structure
// import MyForm from './forms';
import AlwaysOpenExample from './results';
import Aform from './identity'

function App() {
  return (
    <div className="App">
      <LandingPage/>
      {/* <AlwaysOpenExample/> */}
      {/* <MyForm/> */}
      {/* <Aform/> */}
    </div>
  );
}

export default App;
