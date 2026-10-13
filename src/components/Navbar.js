import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { RiShieldUserFill } from 'react-icons/ri';
import AuthService from '../services/auth.service';

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/login');
  };

  return (
    <nav className="navbar-enterprise">
      <Link to="/" className="nav-brand">
        <RiShieldUserFill color="#3b82f6" /> Stack<span style={{color: '#3b82f6'}}>Auth</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link-enterprise">Inicio</Link>
        {currentUser?.roles?.includes('MODERATOR') && (
          <Link to="/mod" className="nav-link-enterprise">Moderador</Link>
        )}
        {currentUser?.roles?.includes('ADMIN') && (
          <Link to="/admin" className="nav-link-enterprise">Admin</Link>
        )}
      </div>

      <div className="nav-user">
        {currentUser ? (
          <>
            <div className="user-badge">
              <HiOutlineUser /> {currentUser.username}
            </div>
            <button onClick={logOut} className="btn-logout">
              <HiOutlineLogout style={{marginRight: '4px'}} /> Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link-enterprise">Iniciar Sesión</Link>
            <Link to="/register" className="nav-link-enterprise" style={{background: '#0f172a', color: 'white'}}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;