import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ show, closeModal, children }) => {
     const modalContent = (
          <div className={ `modal ${show ? 'show' : ''}` }>
               <div className="modal-content">
                    <span className="close" onClick={ closeModal }>
                         &times;
                    </span>
                    { children }
               </div>
          </div>
     );

     return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default Modal;
