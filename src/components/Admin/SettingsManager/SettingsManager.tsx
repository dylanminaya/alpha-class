import './SettingsManager.css';

const SettingsManager = () => {
  return (
    <div className="settings-manager">
      <div className="feature-header">
        <h1>⚙️ Settings & Configuration</h1>
        <p>Customize your TrackIt experience and manage account preferences</p>
      </div>

      <div className="feature-preview">
        <div className="preview-grid">
          <div className="feature-card">
            <h3>💳 Payment Methods</h3>
            <ul>
              <li>Stripe and PayPal integration</li>
              <li>Bank account connections</li>
              <li>Payment gateway management</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🏷️ Categories</h3>
            <ul>
              <li>Custom income categories</li>
              <li>Expense categorization</li>
              <li>Project type management</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>👤 User Profile</h3>
            <ul>
              <li>Personal information</li>
              <li>Business details</li>
              <li>Tax identification numbers</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🔔 Notifications</h3>
            <ul>
              <li>Email notification preferences</li>
              <li>Payment reminders</li>
              <li>Report scheduling</li>
            </ul>
          </div>
        </div>

        <div className="coming-soon">
          <h2>🚀 Coming Soon</h2>
          <p>Comprehensive settings panel with payment integration and customization options.</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: '30%' }}></div>
          </div>
          <span className="progress-text">30% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;






