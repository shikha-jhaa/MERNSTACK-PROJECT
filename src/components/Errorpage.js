import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Errorpage = () => {
  return (
    <>
      <div id='notfound'>
        <div className='notfound'>
          <div className='notfound404'>
            <h1>404</h1>
          </div>
          <h2>We are sorry, page not found</h2>
          <p className='mb-5'>
            The page you are looking for might have been removed
            had its name changed or is temporarily unavailable.
          </p>
          <NavLink to="/">Back To Homepage</NavLink>
        </div>
      </div>
    </>
  )
}

export default Errorpage;
