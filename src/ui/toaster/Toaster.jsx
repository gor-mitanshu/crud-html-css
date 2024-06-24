import React from 'react';
import './Toaster.css';

const Toaster = ({ message, show, handleClose }) => {
     return (
          <div className={ `toaster ${show ? 'show' : ''}` }>
               <div className="toaster-content">
                    <span>{ message }</span>
                    <button onClick={ handleClose }>&times;</button>
               </div>
          </div>
     );
};

export default Toaster;
