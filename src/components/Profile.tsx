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
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, Spain',
    avatar: '👨‍💻',
    notifications: true,
    theme: 'light',
    language: 'English'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Here the information would be sent to the backend
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
          My Profile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Manage your personal information and preferences
        </motion.p>
      </div>

      <div className="profile-content">
        {/* Personal Information */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="section-header">
            <User size={24} />
            <h2>Personal Information</h2>
            {!isEditing && (
              <motion.button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 size={16} />
                Edit
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
                  <label>Phone</label>
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
                  <label>Location</label>
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
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="section-header">
            <Settings size={24} />
            <h2>Settings</h2>
          </div>

          <div className="settings-grid">
            <div className="setting-item">
              <div className="setting-info">
                <Bell size={20} />
                <div>
                  <h4>Notifications</h4>
                  <p>Receive alerts and reminders</p>
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
                  <h4>Theme</h4>
                  <p>Light or dark</p>
                </div>
              </div>
              <select
                value={profile.theme}
                onChange={(e) => handleInputChange('theme', e.target.value as 'light' | 'dark')}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <Shield size={20} />
                <div>
                  <h4>Privacy</h4>
                  <p>Configure profile visibility</p>
                </div>
              </div>
              <button className="config-btn">Configure</button>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="section-header">
            <h2>Usage Statistics</h2>
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
                <h3>Transactions</h3>
                <span className="stat-number">47</span>
                <span className="stat-label">This month</span>
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
                <h3>Total Balance</h3>
                <span className="stat-number">€8,420</span>
                <span className="stat-label">Available</span>
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
                <h3>Goals</h3>
                <span className="stat-number">3</span>
                <span className="stat-label">Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
