import React, { useState, useEffect } from "react";

const FormComponent = ({ addData, updateData, data, editIndex, setEditIndex, editDetailIndex, setEditDetailIndex }) => {
     const [form, setForm] = useState({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          details: [{ product: "", sizes: "", pricing: "" }],
     });

     useEffect(() => {
          if (editIndex !== null && editDetailIndex === null) {
               setForm(data[editIndex]);
          } else {
               setForm({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    details: [{ product: "", sizes: "", pricing: "" }],
               });
          }
     }, [editIndex, editDetailIndex, data]);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setForm({ ...form, [name]: value });
     };

     const handleDetailChange = (e, index) => {
          const { name, value } = e.target;
          const updatedDetails = [...form.details];
          updatedDetails[index] = { ...updatedDetails[index], [name]: value };
          setForm({ ...form, details: updatedDetails });
     };

     const handleAddDetail = () => {
          setForm({ ...form, details: [...form.details, { product: "", sizes: "", pricing: "" }] });
     };

     const handleRemoveDetail = (index) => {
          const updatedDetails = form.details.filter((_, i) => i !== index);
          setForm({ ...form, details: updatedDetails });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (editIndex !== null && editDetailIndex === null) {
               updateData(form, editIndex);
          } else {
               addData(form);
          }
     };

     const handleCancelEdit = () => {
          setEditIndex(null);
          setEditDetailIndex(null);
     };

     return (
          <form onSubmit={ handleSubmit }>
               <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">Firstname</label>
                    <input
                         type="text"
                         className="form-control"
                         id="firstname"
                         name="firstname"
                         value={ form.firstname }
                         onChange={ handleInputChange }
                         required
                    />
               </div>
               <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Lastname</label>
                    <input
                         type="text"
                         className="form-control"
                         id="lastname"
                         name="lastname"
                         value={ form.lastname }
                         onChange={ handleInputChange }
                         required
                    />
               </div>
               <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                         type="email"
                         className="form-control"
                         id="email"
                         name="email"
                         value={ form.email }
                         onChange={ handleInputChange }
                         required
                    />
               </div>
               <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                         type="text"
                         className="form-control"
                         id="phone"
                         name="phone"
                         value={ form.phone }
                         onChange={ handleInputChange }
                         required
                    />
               </div>
               { form.details.map((detail, index) => (
                    <div key={ index } className="mb-3">
                         <label>Detail { index + 1 }</label>
                         <input
                              type="text"
                              className="form-control"
                              name="product"
                              value={ detail.product }
                              onChange={ (e) => handleDetailChange(e, index) }
                              required
                         />
                         <input
                              type="text"
                              className="form-control"
                              name="sizes"
                              value={ detail.sizes }
                              onChange={ (e) => handleDetailChange(e, index) }
                              required
                         />
                         <input
                              type="text"
                              className="form-control"
                              name="pricing"
                              value={ detail.pricing }
                              onChange={ (e) => handleDetailChange(e, index) }
                              required
                         />
                         <button type="button" className="btn btn-danger" onClick={ () => handleRemoveDetail(index) }>Remove</button>
                    </div>
               )) }
               <button type="button" className="btn btn-primary" onClick={ handleAddDetail }>Add Detail</button>
               <button type="submit" className="btn btn-success">Submit</button>
               { editIndex !== null && (
                    <button type="button" className="btn btn-secondary" onClick={ handleCancelEdit }>Cancel Edit</button>
               ) }
          </form>
     );
};

export default FormComponent;