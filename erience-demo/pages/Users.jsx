import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";

const initialState = { name: "", city: "", mobile: "", mediaUrl: "" };

const Users = () => {
     const [data, setData] = useState([]);
     const [editUser, setEditUser] = useState(initialState);
     const [isEditModalOpen, setEditModalOpen] = useState(false);
     const [cities, setCities] = useState([]);

     const getUsers = async () => {
          try {
               const res = await axios.get(`${process.env.REACT_APP_API}/user/getUsers`);
               if (res && res.data.code === 200) {
                    const { users } = res.data;
                    setData(users);
               }
          } catch (error) {
               console.log(error, 'Error getting users: ' + JSON.stringify(error));
          }
     };

     const getAllCities = async () => {
          try {
               const res = await axios.get(`${process.env.REACT_APP_API}/getCities`);
               const { getAllCities } = res.data;
               setCities(getAllCities);
          } catch (error) {
               console.log(error, 'Error getting cities: ' + JSON.stringify(error));
          }
     };

     useEffect(() => {
          getUsers();
          getAllCities();
     }, []);

     const handleEdit = (user) => {
          setEditUser(user);
          setEditModalOpen(true);
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setEditUser({ ...editUser, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const res = await axios.put(`${process.env.REACT_APP_API}/user/updateUser/${editUser._id}`, editUser);
               if (res && res.data.code === 200) {
                    const { msg } = res.data;
                    toast.success(msg);
                    setEditModalOpen(false);
                    getUsers();
               }
          } catch (error) {
               console.log('Error updating user: ' + JSON.stringify(error));
               toast.error(error.response.data.msg);
          }
     };

     const getInitialLetter = (name) => {
          return name ? name.charAt(0).toUpperCase() : '';
     };

     const handleCloseEditModal = () => {
          setEditModalOpen(false);
          setEditUser(initialState);
     };

     return (
          <div className='container mt-4'>
               <Modal
                    show={ isEditModalOpen }
                    handleCloseModal={ handleCloseEditModal }
                    title="Edit User">
                    <form onSubmit={ handleSubmit }>
                         <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input
                                   type="text"
                                   className="form-control"
                                   name="name"
                                   value={ editUser.name }
                                   onChange={ handleInputChange }
                              />
                         </div>
                         <div className="mb-3">
                              <label className="form-label">City</label>
                              <select className='form-control'
                                   value={ editUser.city }
                                   name='city'
                                   onChange={ handleInputChange }
                              >
                                   <option value="" disabled>Select any city</option>
                                   { cities.map((city) => (
                                        <option value={ city.name } key={ city._id }>{ city.name }</option>
                                   )) }
                              </select>
                         </div>
                         <div className="mb-3">
                              <label className="form-label">Mobile</label>
                              <input
                                   type="text"
                                   className="form-control"
                                   name="mobile"
                                   value={ editUser.mobile }
                                   onChange={ handleInputChange }
                              />
                         </div>
                         <div className="mb-3">
                              <label className="form-label">Media URL</label>
                              <input
                                   type="text"
                                   className="form-control"
                                   name="mediaUrl"
                                   value={ editUser.mediaUrl }
                                   onChange={ handleInputChange }
                              />
                         </div>
                         <button type="submit" className="btn btn-primary">Update</button>
                         <button type="button" className="btn btn-secondary ms-2" onClick={ handleCloseEditModal }>Cancel</button>
                    </form>
               </Modal>

               <table className="table">
                    <thead>
                         <tr>
                              <th>No.</th>
                              <th>_id</th>
                              <th>Name</th>
                              <th>City</th>
                              <th>Mobile</th>
                              <th>Media URL</th>
                              <th>Actions</th>
                         </tr>
                    </thead>
                    { data.length > 0 ? (
                         <tbody>
                              { data.map((user, index) => (
                                   <tr key={ user._id }>
                                        <td>{ index + 1 }</td>
                                        <td>{ user._id }</td>
                                        <td>{ user.name }</td>
                                        <td>{ user.city }</td>
                                        <td>{ user.mobile }</td>
                                        <td><img src={ user.mediaUrl } alt={ getInitialLetter(user.name) }
                                             style={ { width: "50px", height: "50px", borderRadius: "50%" } } /></td>
                                        <td>
                                             <i className="bi bi-pencil-fill btn" onClick={ () => handleEdit(user) }></i>
                                        </td>
                                   </tr>
                              )) }
                         </tbody>
                    ) : (
                         <tbody><tr><td colSpan="7">No Data Found</td></tr></tbody>
                    ) }
               </table>
          </div>
     );
};

export default Users;
