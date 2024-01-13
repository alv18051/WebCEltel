import React from "react";
import { useState, useEffect } from "react";
import "./InventarioCards.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";


// const inventariosData = [
//     { IDRepuesto: 1, Nombre: 'Repuesto A', Cantidad: 10, Precio: 100 },
//     { IDRepuesto: 2, Nombre: 'Repuesto B', Cantidad: 15, Precio: 150 },
//     { IDRepuesto: 3, Nombre: 'Repuesto C', Cantidad: 20, Precio: 200 },
//     { IDRepuesto: 4, Nombre: 'Repuesto C', Cantidad: 0, Precio: 250 },
//     // mas datos
//   ];

 

  const Inventarios = () => {
    
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'inventariosData'));
          const data = querySnapshot.docs.map(doc => ({ ...doc.data(), IDRepuesto: doc.id }));
          setData(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
    


    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
    };

    const handleInputChange = (event, id, field) => {
        const newData = data.map(item => {
          if (item.IDRepuesto === id) {
            const newValue = field === 'Cantidad' ? parseInt(event.target.value, 10) : event.target.value;
            return { ...item, [field]: newValue };
          }
          return item;
        });
        setData(newData);
        console.log(newData);
    };


    const filteredData = data.filter(item => {
      return (
        item.IDRepuesto.toString().includes(searchTerm) ||
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Cantidad.toString().includes(searchTerm) ||
        item.Precio.toString().includes(searchTerm)
      );
    });
    
    

    return (
      <div>
        <h2>Inventario de repuestos</h2>
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleEditMode}>{isEditMode ? 'Guardar' : 'Editar'}</button>
        <table>
          <thead>
            <tr>
              <th>IDRepuesto</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.IDRepuesto} className={`${item.Cantidad === 0 ? 'sin-stock' : ''} ${!isEditMode ? 'non-edit-mode' : ''}`}>
                <td>{item.IDRepuesto}</td>
                <td>{isEditMode ? <input type="text" value={item.Nombre} onChange={(e) => handleInputChange(e, item.IDRepuesto, 'Nombre')} /> : item.Nombre}</td>
                <td>{isEditMode ? <input type="number" value={item.Cantidad} onChange={(e) => handleInputChange(e, item.IDRepuesto, 'Cantidad')} /> : item.Cantidad}</td>
                <td>{isEditMode ? <input type="number" value={item.Precio} onChange={(e) => handleInputChange(e, item.IDRepuesto, 'Precio')} /> : item.Precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Inventarios;
