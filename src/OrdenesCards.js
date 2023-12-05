import React from "react";
import { useState } from "react";
import "./OrdenesCards.css";

const OrdenesData = [
    { IDOrden: 1, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
    { IDOrden: 2, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
    { IDOrden: 3, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
    { IDOrden: 4, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
    { IDOrden: 5, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
    // mas datos
  ];

  const Ordenes = () => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState(OrdenesData);


    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
    };

    const handleInputChange = (event, id, field) => {
      const newData = data.map(item => {
        if (item.IDOrden === id) {
          // Assuming all fields are strings; adjust if necessary
          return { ...item, [field]: event.target.value };
        }
        return item;
      });
      setData(newData);
    };
    
    return (
      <div>
        <h2>Registro de Ordenes</h2>
        <button onClick={toggleEditMode}>{isEditMode ? 'Guardar' : 'Editar'}</button>
        <table>
          <thead>
            <tr>
              <th>IDOrden</th>
              <th>Estado</th>
              <th>Descripcion</th>
              <th>FechaEntrega</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.IDOrden}>
                <td>{item.IDOrden}</td>
                <td>{isEditMode ? <input type="text" value={item.Estado} onChange={(e) => handleInputChange(e, item.IDOrden, 'Estado')} /> : item.Estado}</td>
                <td>{isEditMode ? <input type="text" value={item.Descripcion} onChange={(e) => handleInputChange(e, item.IDOrden, 'Descripcion')} /> : item.Descripcion}</td>
                <td>{isEditMode ? <input type="text" value={item.FechaEntrega} onChange={(e) => handleInputChange(e, item.IDOrden, 'FechaEntrega')} /> : item.FechaEntrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Ordenes;
