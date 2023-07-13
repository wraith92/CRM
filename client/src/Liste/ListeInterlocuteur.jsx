// ChildComponent.js
import React, { useContext } from "react";
import DataContext from "./DataContext";
const ListInterlocuteurSociete = () => {
    const dataArray = useContext(DataContext);
    return (
      <div>
        <h1>Items</h1>
        <ul>
          {dataArray.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  };

export default ListInterlocuteurSociete;