import React from 'react';
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi';

const Profile = ({ currentUser }) => {
  if (!currentUser) return <p>Por favor inicia sesión.</p>;

  return (
    <div className="card-enterprise" style={{maxWidth: '600px'}}>
      <div className="profile-header">
        <div className="avatar-circle">
          {currentUser.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{currentUser.username}</h2>
          <p style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <HiOutlineMail /> {currentUser.email}
          </p>
        </div>
      </div>

      <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a'}}>Permisos y Roles Asignados</h3>
      <div>
        {currentUser.roles && currentUser.roles.map((role, index) => (
          <span key={index} className="role-tag">{role}</span>
        ))}
      </div>
    </div>
  );
};

export default Profile;