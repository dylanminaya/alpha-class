import React, { useState, useEffect } from 'react';
import './UserProfileModal.css';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsUpdates: boolean;
    language: string;
    timezone: string;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: Array<{
      date: string;
      location: string;
      device: string;
    }>;
  };
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfile;
  onSave: (user: UserProfile) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [formData, setFormData] = useState<UserProfile>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false,
      language: 'en',
      timezone: 'UTC'
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '',
      loginHistory: []
    }
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePreferencesChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleSecurityChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="user-profile-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit User Information</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="tab-icon">👤</span>
              Profile
            </button>
            <button
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="tab-icon">🔐</span>
              Security
            </button>
            <button
              className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <span className="tab-icon">⚙️</span>
              Preferences
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Address Information</h3>
                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="Enter street address"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        value={formData.address.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        placeholder="Enter ZIP code"
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        value={formData.address.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="tab-content">
                <div className="form-section">
                  <h3>Security Settings</h3>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.security.twoFactorEnabled}
                        onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Last Password Change</label>
                    <input
                      type="text"
                      value={formData.security.lastPasswordChange}
                      readOnly
                      placeholder="Never"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Login History</h3>
                  <div className="login-history">
                    {formData.security.loginHistory.map((login, index) => (
                      <div key={index} className="login-item">
                        <div className="login-info">
                          <span className="login-date">{login.date}</span>
                          <span className="login-location">{login.location}</span>
                          <span className="login-device">{login.device}</span>
                        </div>
                      </div>
                    ))}
                    {formData.security.loginHistory.length === 0 && (
                      <p className="no-data">No login history available</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="tab-content">
                <div className="form-section">
                  <h3>Notification Preferences</h3>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications}
                        onChange={(e) => handlePreferencesChange('notifications', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Enable Push Notifications
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.preferences.emailUpdates}
                        onChange={(e) => handlePreferencesChange('emailUpdates', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Email Updates
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.preferences.smsUpdates}
                        onChange={(e) => handlePreferencesChange('smsUpdates', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      SMS Updates
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Language & Region</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Language</label>
                      <select
                        value={formData.preferences.language}
                        onChange={(e) => handlePreferencesChange('language', e.target.value)}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timezone</label>
                      <select
                        value={formData.preferences.timezone}
                        onChange={(e) => handlePreferencesChange('timezone', e.target.value)}
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="CET">Central European Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
