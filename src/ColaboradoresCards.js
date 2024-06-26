import React from "react";
import { useState, useEffect } from "react";
import "./ColaboradoresCards.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import AddColaboradorModal from "./Modal3";

// const ColaboradoresData = [
//     { IDColaborador: 1, Nombre: 'Jane Doe', Puesto: 'Gerente'},
//     { IDColaborador: 2, Nombre: 'Jane Doe1', Puesto: 'Ventas'},
//     { IDColaborador: 3, Nombre: 'Jane Doe2', Puesto: 'Ventas'},
//     { IDColaborador: 4, Nombre: 'Jane Doe3', Puesto: 'Ventas'},
//     { IDColaborador: 5, Nombre: 'Jane Doe4', Puesto: 'Ventas'},
//     { IDColaborador: 6, Nombre: 'Jane Doe5', Puesto: 'Limpieza'},
//     // mas datos
//   ];

  const Colaboradores = () => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ColaboradoresData'));
      setData(querySnapshot.docs.map(doc => ({ ...doc.data(), IDColaborador: doc.id })));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'ColaboradoresData'));
          setData(querySnapshot.docs.map(doc => ({ ...doc.data(), IDColaborador: doc.id })));
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
        if (item.IDColaborador === id) {
          return { ...item, [field]: event.target.value };
        }
        return item;
      });
      setData(newData);
    };

    const filteredData = data.filter(item => {
      return (
        item.IDColaborador.toString().includes(searchTerm) ||
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Puesto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    
    return (
      <div>
        <h2>Registro de Colaboradores</h2>
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={openModal}>Agregar Nuevo Colaborador</button>
        <AddColaboradorModal isOpen={isModalOpen} onClose={closeModal} />
        <button onClick={fetchData}>Refrescar Colaboradores</button>
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
            {filteredData.map((item) => (
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
