import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SocieteSergio from 'Sofitech';
import SocieteCRM from 'Societe';
const Sofitech = () => {
  //GET societer
  const [societeListeSERGIO, SetsocieteSERGIO] = useState([])
  const [societeListeCRM, SetsocieteCRM] = useState([])

  useEffect(() => {
    SocieteSergio.AllSociete().then(data => SetsocieteSERGIO(data))
    SocieteCRM.AllSociete().then(data => SetsocieteCRM(data))
  });
  const data = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' }
  ];
  
  const filterData = [
    { id: 1 },
    { id: 3 }
  ];
  
  const filteredData = societeListeCRM.filter(item => societeListeSERGIO.some(filter => filter.id === item.id));
  
  console.log(filteredData);
 

  return (
    <table>
      <thead>
        <tr>
          <th>Sirete</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        {societeListe.map((row) => (
          <tr key={row.id}>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
            <td>{row.column3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Sofitech;
