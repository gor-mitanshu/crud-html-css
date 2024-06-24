import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";

const City = () => {
     const [city, setCity] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const res = await axios.post(`${process.env.REACT_APP_API}/addCity`, { name: city });
               if (res) {
                    const { msg } = res.data;
                    toast.success(msg);
                    setCity('')
               } else {
                    toast.error(res);
               }
          } catch (error) {
               toast.error(error.response.data.msg);
          }
     }
     return (
          <>
               <div className="container mt-4">
                    <h2 className='mb-4'>Add City</h2>
                    <form onSubmit={ handleSubmit }>
                         <div className='from-group'>
                              <input
                                   type="text"
                                   className='form-control'
                                   placeholder='Please Enter City Name'
                                   value={ city }
                                   onChange={ (e) => setCity(e.target.value) }
                              />
                         </div>
                         <button className='btn btn-primary mt-3' type='submit'>Add City</button>
                    </form>
               </div>
          </>
     )
}

export default City