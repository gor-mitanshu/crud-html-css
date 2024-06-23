import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ show, closeModal, children }) => {
     if (!show) return null;

     return ReactDOM.createPortal(
          <div className="modal">
               <div className="modal-content">
                    <span className="close" onClick={ closeModal }>
                         &times;
                    </span>
                    { children }
               </div>
          </div>,
          document.getElementById('modal-root')
     );
};

export default Modal;