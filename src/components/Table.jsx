import React from 'react';
import axios from 'axios';

const Table = ({ data, fetchData, openModal }) => {
     const handleDelete = (id) => {
          axios.delete(`http://localhost:5000/users/${id}`).then(() => fetchData());
     };

     return (
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
     );
};

export default Table;