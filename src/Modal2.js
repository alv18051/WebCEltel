import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './Modal.css';

const AddOrdenModal = ({ isOpen, onClose }) => {
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'OrdenesData'), {
        Estado: estado,
        Descripcion: descripcion,
        FechaEntrega: new Date(fechaEntrega) 
      });
      onClose(); 
      setEstado('');
      setDescripcion('');
      setFechaEntrega('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Estado:
            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
          </label>
          <label>
            Descripción:
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </label>
          <label>
            Fecha de Entrega:
            <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} />
          </label>
          <button type="submit">Agregar Orden</button>
        </form>
      </div>
    </div>
  );
};
export default AddOrdenModal;