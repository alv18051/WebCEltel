import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './Modal.css';

const AddColaboradorModal = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [puesto, setPuesto] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'ColaboradoresData'), {
        Nombre: nombre,
        Puesto: puesto
      });
      onClose();
      setNombre('');
      setPuesto('');
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
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>
            Puesto:
            <input type="text" value={puesto} onChange={(e) => setPuesto(e.target.value)} />
          </label>
          <button type="submit">Agregar Colaborador</button>
        </form>
      </div>
    </div>
  );
};
export default AddColaboradorModal;