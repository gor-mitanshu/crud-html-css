import React, { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";
import axios from "axios";

const App = () => {
     const [data, setData] = useState([]);
     const [editIndex, setEditIndex] = useState(null);
     const [editDetailIndex, setEditDetailIndex] = useState(null);

     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          try {
               const response = await axios.get("http://localhost:5000/data");
               setData(response.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const addData = async (formData) => {
          try {
               const response = await axios.post("http://localhost:5000/data", formData);
               setData([...data, response.data]);
          } catch (error) {
               console.error("Error adding data:", error);
          }
     };

     const updateData = async (formData, index) => {
          try {
               await axios.put(`http://localhost:5000/data/${index}`, formData);
               const updatedData = [...data];
               updatedData[index] = formData;
               setData(updatedData);
               setEditIndex(null);
               setEditDetailIndex(null);
          } catch (error) {
               console.error("Error updating data:", error);
          }
     };

     const deleteData = async (index, detailIndex = null) => {
          try {
               if (detailIndex === null) {
                    await axios.delete(`http://localhost:5000/data/${index}`);
                    const updatedData = data.filter((_, i) => i !== index);
                    setData(updatedData);
               } else {
                    const response = await axios.get(`http://localhost:5000/data/${index}`);
                    const item = response.data;
                    item.details.splice(detailIndex, 1);
                    await axios.put(`http://localhost:5000/data/${index}`, item);
                    fetchData();
               }
          } catch (error) {
               console.error("Error deleting data:", error);
          }
     };

     const setEditDetailIndexHandler = (index, detailIndex) => {
          setEditIndex(index);
          setEditDetailIndex(detailIndex);
     };

     return (
          <div className="container mt-5">
               <h1 className="text-center">CRUD App with Details</h1>
               <FormComponent
                    addData={ addData }
                    updateData={ updateData }
                    data={ data }
                    editIndex={ editIndex }
                    setEditIndex={ setEditIndex }
                    editDetailIndex={ editDetailIndex }
                    setEditDetailIndex={ setEditDetailIndexHandler }
               />
               <TableComponent
                    data={ data }
                    setEditIndex={ setEditIndex }
                    deleteData={ deleteData }
                    setEditDetailIndex={ setEditDetailIndexHandler }
               />
          </div>
     );
};

export default App;
