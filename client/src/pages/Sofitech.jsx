import React, { useState, useEffect } from 'react';
import Societe from '../controllers/Sofitech';
const Sofitech = () => {
  //GET societer
  const [societeListe, Setsociete] = useState([])

  useEffect(() => {
     Societe.AllSociete().then(data => Setsociete(data))
  });

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
