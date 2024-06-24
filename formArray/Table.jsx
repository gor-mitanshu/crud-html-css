import React from "react";

const TableComponent = ({ data, setEditIndex, deleteData, setEditDetailIndex }) => {
     return (
          <table className="table table-striped">
               <thead>
                    <tr>
                         <th>Firstname</th>
                         <th>Lastname</th>
                         <th>Email</th>
                         <th>Phone</th>
                         <th>Details</th>
                         <th>Action</th>
                    </tr>
               </thead>
               <tbody>
                    { data.map((item, index) => (
                         <tr key={ index }>
                              <td>{ item.firstname }</td>
                              <td>{ item.lastname }</td>
                              <td>{ item.email }</td>
                              <td>{ item.phone }</td>
                              <td>
                                   { item.details.map((detail, detailIndex) => (
                                        <div key={ detailIndex }>
                                             <p>Product: { detail.product }</p>
                                             <p>Size: { detail.sizes }</p>
                                             <p>Pricing: { detail.pricing }</p>
                                             <button
                                                  type="button"
                                                  className="btn btn-primary"
                                                  onClick={ () => setEditDetailIndex(index, detailIndex) }
                                             >
                                                  Edit Detail
                                             </button>
                                        </div>
                                   )) }
                              </td>
                              <td>
                                   <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={ () => setEditIndex(index) }
                                   >
                                        Edit
                                   </button>
                                   <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={ () => deleteData(index) }
                                   >
                                        Delete
                                   </button>
                              </td>
                         </tr>
                    )) }
               </tbody>
          </table>
     );
};

export default TableComponent;