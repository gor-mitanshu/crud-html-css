import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const initialState = { name: "", city: "", mobile: "", mediaUrl: "" }
const User = () => {
     const [cities, setCities] = useState([]);
     const [user, setUser] = useState(initialState);

     const getAllCities = async () => {
          try {
               const res = await axios.get(`${process.env.REACT_APP_API}/getCities`);
               const { getAllCities } = res.data;
               setCities(getAllCities);
          } catch (error) {
               console.log(error, 'Error getting cities: ' + JSON.stringify(error));
          }
     }
     useEffect(() => {
          getAllCities();
     }, [])

     const handleChange = (e) => {
          const { name, value } = e.target;
          setUser({ ...user, [name]: value });
     }

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               const res = await axios.post(`${process.env.REACT_APP_API}/user/addUser`, user);
               console.log(res)
               if (!!res && res.data.code === 200) {
                    const { msg } = res.data;
                    toast.success(msg);
                    setUser(initialState)
               }
          } catch (error) {
               console.log(error)
               toast.error(error.response.data.msg);
          }
     }
     return (
          <>
               <div className="container mt-4">
                    <h2 className='mb-4'>Add User</h2>
                    <form onSubmit={ handleSubmit }>
                         <div className="form-group">
                              <input
                                   className='form-control'
                                   type="text"
                                   value={ user.name }
                                   name='name'
                                   onChange={ handleChange }
                                   placeholder='Please enter your name'
                              />
                         </div>
                         <div className="form-group mt-2">
                              <select className='form-control'
                                   value={ user.city }
                                   name='city'
                                   onChange={ handleChange }
                              >
                                   <option value="" disabled>Select any city</option>
                                   { cities.map((city) => (
                                        <option value={ city.name } key={ city._id }>{ city.name }</option>
                                   )) }
                              </select>
                         </div>
                         <div className="form-group mt-2">
                              <input
                                   type="number"
                                   className='form-control'
                                   value={ user.mobile }
                                   name='mobile'
                                   onChange={ handleChange }
                                   placeholder='Please enter your Mobile Number'
                              />
                         </div>
                         <div className="form-group mt-2">
                              <input
                                   type="text"
                                   className='form-control'
                                   value={ user.mediaUrl }
                                   name='mediaUrl'
                                   onChange={ handleChange }
                                   placeholder='Please enter Media Url'
                              />
                         </div>
                         <button type='submit' className='btn btn-primary mt-3'> Submit</button>
                    </form>
               </div>
          </>
     )
}

export default User