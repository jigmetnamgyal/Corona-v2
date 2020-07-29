import React from 'react'
import numeral from 'numeral'
import './table.css'
function Table({countries}) {
       return(
           <div className="table">
               <th>
                   <td>Country Flag</td>
                   <td>Country</td>
                   <td>Total Cases</td>
               </th>
               {countries.map( ({country, cases, countryInfo}) => (
                   <tr>
                       <td><img className="countryFlag" src={countryInfo.flag}/></td>
                       <td>{country}</td>
                       <td>
               <strong>{numeral(cases).format('0.0a')}</strong>
                       </td>
                   </tr>
               ))}
           </div>
       );
}

export default Table
