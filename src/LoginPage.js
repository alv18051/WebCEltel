import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
      navigate('/home');
    } catch (error) {
      
      console.error("Error signing in with email and password", error);
      setErrorMessage(error.message);
      
    }
  };

  return (
    <div className="login-container">
        
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="ejemplo@correo.com" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Ingresa tu contraseña" 
        />
        {errorMessage && <div className='error-alert'>{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
    
  );
};

export default LoginPage;
