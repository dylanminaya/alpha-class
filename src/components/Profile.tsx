import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  Shield, 
  Bell, 
  Palette,
  Save,
  Edit3
} from 'lucide-react';
import './Profile.css';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  notifications: boolean;
  theme: 'light' | 'dark';
  language: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Rodríguez',
    email: 'alex.rodriguez@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    avatar: '👨‍💻',
    notifications: true,
    theme: 'light',
    language: 'Español'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Aquí se enviaría la información al backend
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Mi Perfil
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Gestiona tu información personal y preferencias
        </motion.p>
      </div>

      <div className="profile-content">
        {/* Información Personal */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="section-header">
            <User size={24} />
            <h2>Información Personal</h2>
            {!isEditing && (
              <motion.button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 size={16} />
                Editar
              </motion.button>
            )}
          </div>

          <div className="profile-info">
            <div className="avatar-section">
              <motion.div 
                className="avatar"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {profile.avatar}
              </motion.div>
              <h3>{profile.name}</h3>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <Mail size={20} />
                <div>
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <Phone size={20} />
                <div>
                  <label>Teléfono</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <label>Ubicación</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <motion.div 
                className="edit-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button className="save-btn" onClick={handleSave}>
                  <Save size={16} />
                  Guardar Cambios
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancelar
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Configuraciones */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="section-header">
            <Settings size={24} />
            <h2>Configuraciones</h2>
          </div>

          <div className="settings-grid">
            <div className="setting-item">
              <div className="setting-info">
                <Bell size={20} />
                <div>
                  <h4>Notificaciones</h4>
                  <p>Recibir alertas y recordatorios</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={profile.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <Palette size={20} />
                <div>
                  <h4>Tema</h4>
                  <p>Claro u oscuro</p>
                </div>
              </div>
              <select
                value={profile.theme}
                onChange={(e) => handleInputChange('theme', e.target.value as 'light' | 'dark')}
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <Shield size={20} />
                <div>
                  <h4>Privacidad</h4>
                  <p>Configurar visibilidad del perfil</p>
                </div>
              </div>
              <button className="config-btn">Configurar</button>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="section-header">
            <h2>Estadísticas de Uso</h2>
          </div>

          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Transacciones</h3>
                <span className="stat-number">47</span>
                <span className="stat-label">Este mes</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Balance Total</h3>
                <span className="stat-number">€8,420</span>
                <span className="stat-label">Disponible</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>Metas</h3>
                <span className="stat-number">3</span>
                <span className="stat-label">Activas</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
