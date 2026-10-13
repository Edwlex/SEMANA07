import React, { useState, useEffect } from 'react';
import { HiOutlineGlobe, HiOutlineShieldCheck, HiOutlineUsers } from 'react-icons/hi';
import UserService from '../services/user.service';

const Home = () => {
  const [content, setContent] = useState('Cargando...');

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => setContent(response.data.content),
      (error) => setContent('No se pudo cargar el contenido público.')
    );
  }, []);

  return (
    <div>
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem'}}>Panel de Control</h1>
        <p style={{color: '#64748b'}}>Bienvenido a la plataforma de autenticación segura.</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <HiOutlineGlobe className="icon" />
          <h3>Acceso Público</h3>
          <p className="value" style={{fontSize: '1rem', fontWeight: 400, color: '#1e293b'}}>{content}</p>
        </div>
        <div className="stat-card">
          <HiOutlineShieldCheck className="icon" />
          <h3>Seguridad</h3>
          <p className="value">JWT</p>
          <p style={{fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem'}}>Autenticación basada en tokens</p>
        </div>
        <div className="stat-card">
          <HiOutlineUsers className="icon" />
          <h3>Roles</h3>
          <p className="value">RBAC</p>
          <p style={{fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem'}}>Control de acceso por roles</p>
        </div>
      </div>
    </div>
  );
};

export default Home;