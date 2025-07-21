import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './index.css';

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <span className="navbar-logo">Books of Mine</span>
      <div className="navbar-links">
        <a href="/">Inicio</a>
        {user ? (
          <>
            <span style={{color: 'var(--color-accent)', fontWeight: 600, marginLeft: 16, marginRight: 8}}>
              {user.username}
            </span>
            <a href="/profile">Perfil</a>
            <button style={{background: 'var(--color-danger)', marginLeft: 8}} onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <a href="/login">Iniciar sesión</a>
            <a href="/register">Registrarse</a>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <AuthProvider>
      <Router>
        <div className="app-bg">
          <header style={{background: 'var(--color-bg-secondary)', padding: '1.5rem 0', borderBottom: '2px solid var(--color-primary-dark)'}}>
            <Navbar />
          </header>
          <main style={{maxWidth: 700, margin: '2rem auto', background: 'var(--color-bg-secondary)', borderRadius: 12, boxShadow: '0 2px 16px #0008', padding: '2rem'}}>
            <Routes>
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
