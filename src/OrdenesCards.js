import React from "react";
import { useState, useEffect } from "react";
import "./OrdenesCards.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import AddOrdenModal from "./Modal2";

// const OrdenesData = [
//     { IDOrden: 1, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
//     { IDOrden: 2, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
//     { IDOrden: 3, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
//     { IDOrden: 4, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
//     { IDOrden: 5, Estado: 'En progreso', Descripcion: 'Descripcion del problema de esta orden ', FechaEntrega: '2021-10-10'},
//     // mas datos
//   ];

  const Ordenes = () => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

const fetchData = async () => {
  setIsLoading(true);
  try {
    const querySnapshot = await getDocs(collection(db, 'OrdenesData'));
    const fetchedData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      if (data.FechaEntrega?.toDate) {
        data.FechaEntrega = data.FechaEntrega.toDate().toISOString().split('T')[0];
      }
      return { ...data, IDOrden: doc.id };
    });
    setData(fetchedData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
    setIsLoading(false);
  }
};


    const openModal = () => {
      setIsModalOpen(true);
    };
  
 
    const closeModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'OrdenesData'));
          const fetchedData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Timestamp to Date
        if (data.FechaEntrega?.toDate) {
          data.FechaEntrega = data.FechaEntrega.toDate().toISOString().split('T')[0];
        }
        return { ...data, IDOrden: doc.id };
      });
      setData(fetchedData);
          //setData(querySnapshot.docs.map(doc => ({ ...doc.data(), IDOrden: doc.id })));
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
        if (item.IDOrden === id) {
          return { ...item, [field]: event.target.value };
        }
        return item;
      });
      setData(newData);
    };

    const filteredData = data.filter(item => {
      return (
        item.IDOrden.toString().includes(searchTerm) ||
        item.Estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.FechaEntrega.toString().includes(searchTerm)
      );
    });

    
    return (
      <div>
        <h2>Registro de Ordenes</h2>
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={openModal}>Agregar Nueva Orden</button>
      <AddOrdenModal isOpen={isModalOpen} onClose={closeModal} />
      <button onClick={fetchData}>Refrescar</button>
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
            {filteredData.map((item) => (
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
