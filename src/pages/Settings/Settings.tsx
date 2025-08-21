import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme, availableFonts } from '../../context/ThemeContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, fontFamily, toggleTheme, setFontFamily } = useTheme();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se guardaría la información del perfil
    console.log('Profile updated:', profileData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <h1>Configuración</h1>
          <p>Personaliza tu experiencia en Alpha</p>
        </header>

        <div className="settings-sections">
          {/* Perfil del Usuario */}
          <section className="settings-section">
            <div className="section-header">
              <h2>📋 Perfil del Usuario</h2>
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <button type="submit" className="save-btn">
                  Guardar Cambios
                </button>
              )}
            </form>
          </section>

          {/* Configuración de Tema */}
          <section className="settings-section">
            <div className="section-header">
              <h2>🎨 Apariencia</h2>
            </div>
            
            <div className="theme-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Modo de Tema</h3>
                  <p>Elige entre modo claro u oscuro</p>
                </div>
                <div className="setting-control">
                  <button 
                    className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`}
                    onClick={toggleTheme}
                  >
                    <span className="toggle-icon">
                      {theme === 'dark' ? '🌙' : '☀️'}
                    </span>
                    <span className="toggle-label">
                      {theme === 'dark' ? 'Oscuro' : 'Claro'}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Fuente de Texto</h3>
                  <p>Personaliza la tipografía de la aplicación</p>
                </div>
                <div className="setting-control">
                  <select 
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="font-selector"
                  >
                    {availableFonts.map(font => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Configuración de Seguridad */}
          <section className="settings-section">
            <div className="section-header">
              <h2>🔒 Seguridad</h2>
            </div>
            
            <div className="security-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Cambiar Contraseña</h3>
                  <p>Actualiza tu contraseña de acceso</p>
                </div>
                <div className="setting-control">
                  <button className="action-btn">
                    Cambiar
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Autenticación de Dos Factores</h3>
                  <p>Añade una capa extra de seguridad</p>
                </div>
                <div className="setting-control">
                  <button className="action-btn">
                    Configurar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Configuración de Notificaciones */}
          <section className="settings-section">
            <div className="section-header">
              <h2>🔔 Notificaciones</h2>
            </div>
            
            <div className="notification-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Notificaciones Push</h3>
                  <p>Recibe alertas en tiempo real</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Notificaciones por Email</h3>
                  <p>Recibe reportes por correo electrónico</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
