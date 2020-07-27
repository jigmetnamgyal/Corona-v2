import React from 'react'

function Table({countries}) {
       return(
           <div className="table">
               <th>
                   <td>Country</td>
                   <td>Total Cases</td>
               </th>
               {countries.map( ({country, cases}) => (
                   <tr>
                       <td>{country}</td>
                       <td>
               <strong>{cases}</strong>
                       </td>
                   </tr>
               ))}
           </div>
       );
}

export default Table
