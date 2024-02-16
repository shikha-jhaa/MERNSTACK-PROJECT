import React from 'react';
import ReactDOM from 'react-dom'; // Correct import statement
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render (
  <React.StrictMode>
     <BrowserRouter > 
      <App />
     </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root') // You need to specify the target root element
);

reportWebVitals();

