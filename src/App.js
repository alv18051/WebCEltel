import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'; 
import Inventarios from "./InventarioCards";
import Ordenes from "./OrdenesCards";
import Colaboradores from "./ColaboradoresCards";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { signOut } from "firebase/auth";
import { auth } from './firebaseConfig'; 
import { useNavigate } from 'react-router-dom';


// const handleLogout = async () => {
  
//   try {
//     await signOut(auth);
//     // Puedes redirigir al usuario a la página de inicio de sesión o manejar el cierre de sesión como prefieras
//     console.log("Usuario ha cerrado sesión");
//   } catch (error) {
//     console.error("Error al cerrar sesión: ", error);
//   }
// };

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
};

// Components for different pages
const HomePage = () => (
  <div className="content">
    <div className="button-container">
      <Link to="/inventarios" className="square-button green">
        <i className="fa fa-cubes"></i> Inventarios
      </Link>
      <Link to="/ordenes" className="square-button blue">
        <i className="fa fa-clipboard"></i> Ordenes
      </Link>
      <Link to="/colaboradores" className="square-button orange">
        <i className="fa fa-user"></i> Colaboradores
      </Link>
    </div>
  </div>
);

//const Inventarios = () => <div>Inventario de repuesto va aqui</div>;
//const Ordenes = () => <div>Las ordenes van aqui</div>;🏠
//const Colaboradores = () => <div>Lo de los colaboradores va aqui</div>;


// App component with routing
// const App = () => {
//   return (
//     <Router>
//       <nav className="navbar">
//       <Link to="/home" className="logo">CelTel</Link>
//       <Link to="/home" className="home-icon">⌂</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/home" element={<HomePage />} /> {/* New path for HomePage */}
//         <Route path="/inventarios" element={<Inventarios />} />
//         <Route path="/ordenes" element={<Ordenes />} />
//         <Route path="/colaboradores" element={<Colaboradores />} />
//       </Routes>
//     </Router>
//   );
// };

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/home" className="logo">CelTel</Link>
        <Link to="/home" className="home-icon">⌂</Link>
        <LogoutButton />
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/inventarios" element={<Inventarios />} />
          <Route path="/ordenes" element={<Ordenes />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
