import React, { useState } from 'react';
import ConfirmDialog from '../ui/dialog/ConfirmDialog';
import axios from 'axios';

const Table = ({ data, fetchData, openModal }) => {
     const [showConfirmDialog, setShowConfirmDialog] = useState(false);
     const [deleteId, setDeleteId] = useState(null);

     const handleDelete = (id) => {
          setDeleteId(id);
          setShowConfirmDialog(true);
     };

     const confirmDelete = () => {
          axios.delete(`http://localhost:5000/users/${deleteId}`).then(() => {
               fetchData();
               setShowConfirmDialog(false);
          });
     };

     const cancelDelete = () => {
          setShowConfirmDialog(false);
          setDeleteId(null);
     };

     return (
          <>
               <table>
                    <thead>
                         <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Hobbies</th>
                              <th>Gender</th>
                              <th>Education</th>
                              <th>Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         { data.map((user) => (
                              <tr key={ user.id }>
                                   <td>{ user.firstname }</td>
                                   <td>{ user.lastname }</td>
                                   <td>{ user.email }</td>
                                   <td>{ user.phone }</td>
                                   <td>{ user.hobbies }</td>
                                   <td>{ user.gender }</td>
                                   <td>{ user.education.join(', ') }</td>
                                   <td>
                                        <button onClick={ () => handleDelete(user.id) }>Delete</button>
                                        <button onClick={ () => openModal(user) }>Edit</button>
                                        <button onClick={ () => alert(JSON.stringify(user, null, 2)) }>View</button>
                                   </td>
                              </tr>
                         )) }
                    </tbody>
               </table>
               { showConfirmDialog && (
                    <ConfirmDialog
                         message="Are you sure you want to delete this user?"
                         onConfirm={ confirmDelete }
                         onCancel={ cancelDelete }
                    />
               ) }
          </>
     );
};

export default Table;