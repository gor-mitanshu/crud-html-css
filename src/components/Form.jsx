import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ fetchData, currentUser, closeModal }) => {
     const [formData, setFormData] = useState({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          hobbies: 'Reading',
          gender: '',
          education: []
     });

     useEffect(() => {
          if (currentUser) {
               setFormData(currentUser);
          }
     }, [currentUser]);

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          if (type === 'checkbox') {
               setFormData((prevState) => ({
                    ...prevState,
                    education: checked
                         ? [...prevState.education, value]
                         : prevState.education.filter((item) => item !== value)
               }));
          } else {
               setFormData({ ...formData, [name]: value });
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (currentUser) {
               axios.put(`http://localhost:5000/users/${currentUser.id}`, formData).then(() => {
                    fetchData();
                    closeModal();
               });
          } else {
               axios.post('http://localhost:5000/users', formData).then(() => {
                    fetchData();
                    setFormData({
                         firstname: '',
                         lastname: '',
                         email: '',
                         phone: '',
                         hobbies: 'Reading',
                         gender: '',
                         education: []
                    });
                    closeModal();
               });
          }
     };

     return (
          <form onSubmit={ handleSubmit }>
               <label>First Name:</label>
               <input type="text" name="firstname" value={ formData.firstname } onChange={ handleChange } required />

               <label>Last Name:</label>
               <input type="text" name="lastname" value={ formData.lastname } onChange={ handleChange } required />

               <label>Email:</label>
               <input type="email" name="email" value={ formData.email } onChange={ handleChange } required />

               <label>Phone:</label>
               <input type="number" name="phone" value={ formData.phone } onChange={ handleChange } required />

               <label>Hobbies:</label>
               <select name="hobbies" value={ formData.hobbies } onChange={ handleChange }>
                    <option value="Reading">Reading</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Traveling">Traveling</option>
               </select>

               <label>Gender:</label>
               <label>
                    <input type="radio" name="gender" value="Male" checked={ formData.gender === 'Male' } onChange={ handleChange } /> Male
               </label>
               <label>
                    <input type="radio" name="gender" value="Female" checked={ formData.gender === 'Female' } onChange={ handleChange } /> Female
               </label>

               <label>Education:</label>
               <label>
                    <input type="checkbox" name="education" value="High School" checked={ formData.education.includes('High School') } onChange={ handleChange } /> High School
               </label>
               <label>
                    <input type="checkbox" name="education" value="Bachelor's" checked={ formData.education.includes("Bachelor's") } onChange={ handleChange } /> Bachelor's
               </label>
               <label>
                    <input type="checkbox" name="education" value="Master's" checked={ formData.education.includes("Master's") } onChange={ handleChange } /> Master's
               </label>

               <button type="submit">{ currentUser ? 'Update' : 'Submit' }</button>
          </form>
     );
};

export default Form;