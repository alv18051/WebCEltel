import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; 

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe; 
  }, []);

  return currentUser;
};


const ProtectedRoute = () => {
  const currentUser = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
