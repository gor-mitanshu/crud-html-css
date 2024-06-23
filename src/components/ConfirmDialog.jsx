import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
     return (
          <div className="confirm-dialog">
               <div className="confirm-dialog-content">
                    <p>{ message }</p>
                    <div className="confirm-dialog-buttons">
                         <button onClick={ onConfirm }>Confirm</button>
                         <button onClick={ onCancel }>Cancel</button>
                    </div>
               </div>
          </div>
     );
};

export default ConfirmDialog;
