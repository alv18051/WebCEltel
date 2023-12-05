import React from "react";
import { useState } from "react";
import "./ColaboradoresCards.css";

const ColaboradoresData = [
    { IDColaborador: 1, Nombre: 'Jane Doe', Puesto: 'Gerente'},
    { IDColaborador: 2, Nombre: 'Jane Doe1', Puesto: 'Ventas'},
    { IDColaborador: 3, Nombre: 'Jane Doe2', Puesto: 'Ventas'},
    { IDColaborador: 4, Nombre: 'Jane Doe3', Puesto: 'Ventas'},
    { IDColaborador: 5, Nombre: 'Jane Doe4', Puesto: 'Ventas'},
    { IDColaborador: 6, Nombre: 'Jane Doe5', Puesto: 'Limpieza'},
    // mas datos
  ];

  const Colaboradores = () => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState(ColaboradoresData);


    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
    };

    const handleInputChange = (event, id, field) => {
      const newData = data.map(item => {
        if (item.IDColaborador === id) {
          // Adjust data types as necessary
          return { ...item, [field]: event.target.value };
        }
        return item;
      });
      setData(newData);
    };
    
    return (
      <div>
        <h2>Registro de Colaboradores</h2>
        <button onClick={toggleEditMode}>{isEditMode ? 'Guardar' : 'Editar'}</button>
        <table>
          <thead>
            <tr>
              <th>IDColaborador</th>
              <th>Nombre</th>
              <th>Puesto</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.IDColaborador}>
                <td>{item.IDColaborador}</td>
                <td>{isEditMode ? <input type="text" value={item.Nombre} onChange={(e) => handleInputChange(e, item.IDColaborador, 'Nombre')} />: item.Nombre}
                </td>
                <td>{isEditMode? <input type="text" value={item.Puesto} onChange={(e) => handleInputChange(e, item.IDColaborador, 'Puesto')} />: item.Puesto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Colaboradores;
