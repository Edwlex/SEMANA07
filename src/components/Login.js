import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { MdErrorOutline } from 'react-icons/md';
import AuthService from '../services/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !password) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    AuthService.login(username, password).then(
      () => { navigate('/profile'); window.location.reload(); },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="card-enterprise">
      <div className="card-header-enterprise">
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa tus credenciales para acceder a tu cuenta</p>
      </div>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Usuario</label>
          <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ej. jorgeventura" />
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>

        <button type="submit" className="btn-primary-enterprise">
          <HiOutlineLogin /> Iniciar Sesión
        </button>

        {message && (
          <div className="alert-enterprise alert-error">
            <MdErrorOutline /> {message}
          </div>
        )}

        <p style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b'}}>
          ¿No tienes cuenta? <Link to="/register" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: 600}}>Crear cuenta</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;