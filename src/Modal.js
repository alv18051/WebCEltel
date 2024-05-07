import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './Modal.css';

const AddItemModal = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'inventariosData'), {
        Nombre: nombre,
        Cantidad: parseInt(cantidad, 10),
        Precio: parseFloat(precio)
      });
      onClose(); // Cierra el modal y limpia el formulario
      setNombre('');
      setCantidad('');
      setPrecio('');
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
            Cantidad:
            <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          </label>
          <label>
            Precio:
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </label>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;