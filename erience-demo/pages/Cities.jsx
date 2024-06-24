import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Cities = () => {
     const [cities, setCities] = useState([]);

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
     return (
          <>
               <div className="container mt-4">
                    <h2>List of all Cities</h2>
                    <ul className='list-group'>
                         { cities.map((city) => (
                              <li className='list-group-item' key={ city._id }>{ city.name }</li>
                         )) }
                    </ul>
               </div>
          </>
     )
}

export default Cities