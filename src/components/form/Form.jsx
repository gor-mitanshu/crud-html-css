import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const Form = ({ fetchData, currentUser, closeModal }) => {
     const [formData, setFormData] = useState({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          hobbies: '',
          gender: '',
          education: [],
     });

     const [errors, setErrors] = useState({});

     useEffect(() => {
          if (currentUser) {
               setFormData({
                    firstname: currentUser.firstname || '',
                    lastname: currentUser.lastname || '',
                    email: currentUser.email || '',
                    phone: currentUser.phone || '',
                    hobbies: currentUser.hobbies || '',
                    gender: currentUser.gender || '',
                    education: currentUser.education || [],
               });
          }
     }, [currentUser]);

     const validate = (name, value) => {
          let error = '';

          switch (name) {
               case 'firstname':
               case 'lastname':
                    if (!value) error = 'This field is required';
                    break;
               case 'email':
                    if (!value) error = 'This field is required';
                    else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid';
                    break;
               case 'phone':
                    if (!value) error = 'This field is required';
                    else if (!/^\d+$/.test(value)) error = 'Phone number is invalid';
                    break;
               default:
                    break;
          }

          return error;
     };

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;

          let updatedValue = value;
          if (type === 'checkbox') {
               updatedValue = checked
                    ? [...formData.education, value]
                    : formData.education.filter((edu) => edu !== value);
          }

          if (type === 'radio') {
               updatedValue = checked ? value : '';
          }

          setFormData({ ...formData, [name]: updatedValue });

          const error = validate(name, updatedValue);
          setErrors({ ...errors, [name]: error });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          const validationErrors = {};
          Object.keys(formData).forEach((key) => {
               const error = validate(key, formData[key]);
               if (error) {
                    validationErrors[key] = error;
               }
          });

          if (Object.keys(validationErrors).length === 0) {
               if (currentUser) {
                    axios.put(`http://localhost:5000/users/${currentUser.id}`, formData).then(() => {
                         fetchData();
                         closeModal();
                    });
               } else {
                    axios.post('http://localhost:5000/users', formData).then(() => {
                         fetchData();
                         closeModal();
                    });
               }
          } else {
               setErrors(validationErrors);
          }
     };

     return (
          <form onSubmit={ handleSubmit }>
               <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstname" value={ formData.firstname } onChange={ handleChange } />
                    { errors.firstname && <span className="error">{ errors.firstname }</span> }
               </div>
               <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastname" value={ formData.lastname } onChange={ handleChange } />
                    { errors.lastname && <span className="error">{ errors.lastname }</span> }
               </div>
               <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={ formData.email } onChange={ handleChange } />
                    { errors.email && <span className="error">{ errors.email }</span> }
               </div>
               <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={ formData.phone } onChange={ handleChange } />
                    { errors.phone && <span className="error">{ errors.phone }</span> }
               </div>
               <div className="form-group">
                    <label>Hobbies:</label>
                    <select name="hobbies" value={ formData.hobbies } onChange={ handleChange }>
                         <option value="">Select</option>
                         <option value="Reading">Reading</option>
                         <option value="Traveling">Traveling</option>
                         <option value="Gaming">Gaming</option>
                    </select>
               </div>
               <div className="form-group">
                    <label>Gender:</label>
                    <input
                         type="radio"
                         name="gender"
                         value="Male"
                         checked={ formData.gender === 'Male' }
                         onChange={ handleChange }
                    />
                    Male
                    <input
                         type="radio"
                         name="gender"
                         value="Female"
                         checked={ formData.gender === 'Female' }
                         onChange={ handleChange }
                    />
                    Female
               </div>
               <div className="form-group">
                    <label>Education:</label>
                    <input
                         type="checkbox"
                         name="education"
                         value="High School"
                         checked={ formData.education.includes('High School') }
                         onChange={ handleChange }
                    />
                    High School
                    <input
                         type="checkbox"
                         name="education"
                         value="Bachelor's"
                         checked={ formData.education.includes("Bachelor's") }
                         onChange={ handleChange }
                    />
                    Bachelor's
                    <input
                         type="checkbox"
                         name="education"
                         value="Master's"
                         checked={ formData.education.includes("Master's") }
                         onChange={ handleChange }
                    />
                    Master's
               </div>
               <button type="submit">{ currentUser ? "Update" : "Submit" }</button>
          </form>
     );
};

export default Form;
