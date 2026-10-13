import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md';
import AuthService from '../services/auth.service';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage(''); setSuccessful(false);

    if (!username || !email || !password) return setMessage('Todos los campos son obligatorios.');
    if (password.length < 6) return setMessage('La contraseña debe tener al menos 6 caracteres.');
    if (!/\S+@\S+\.\S+/.test(email)) return setMessage('El formato del correo no es válido.');

    AuthService.register(username, email, password).then(
      (response) => { setMessage(response.data.message); setSuccessful(true); },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message;
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="card-enterprise">
      <div className="card-header-enterprise">
        <h2>Crear cuenta</h2>
        <p>Completa el formulario para registrarte en la plataforma</p>
      </div>
      
      {!successful ? (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ej. jorgeventura" />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ej. jorge@empresa.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
          </div>

          <button type="submit" className="btn-primary-enterprise">
            <HiOutlineUserAdd /> Registrarse
          </button>

          {message && <div className={`alert-enterprise ${successful ? 'alert-success' : 'alert-error'}`}>{message}</div>}

          <p style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b'}}>
            ¿Ya tienes cuenta? <Link to="/login" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: 600}}>Iniciar sesión</Link>
          </p>
        </form>
      ) : (
        <div className="alert-enterprise alert-success" style={{justifyContent: 'center'}}>
          <MdCheckCircleOutline style={{fontSize: '1.2rem'}} /> Cuenta creada exitosamente. <Link to="/login" style={{color: '#10b981', fontWeight: 600, marginLeft: '5px'}}>Ir al login</Link>
        </div>
      )}
    </div>
  );
};

export default Register;