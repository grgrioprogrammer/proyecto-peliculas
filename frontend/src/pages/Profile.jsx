import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ username, email, password: password || undefined })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message || 'Error al actualizar');
    setSuccess('Perfil actualizado');
    setPassword('');
    // Actualizar el usuario en el contexto para refrescar el navbar
    if (data.user) {
      setUser(data.user);
    }
  };

  return (
    <div>
      <h2 style={{color: 'var(--color-primary)'}}>Ajustes de usuario</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nueva contraseña (opcional)" />
        <button type="submit">Actualizar perfil</button>
        {success && <div style={{color: 'var(--color-accent)', marginTop: 8}}>{success}</div>}
        {error && <div style={{color: 'var(--color-danger)', marginTop: 8}}>{error}</div>}
      </form>
      <button style={{background: 'var(--color-danger)', marginTop: 24}} onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Profile;
