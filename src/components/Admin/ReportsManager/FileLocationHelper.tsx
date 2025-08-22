import { useState } from 'react';
import './FileLocationHelper.css';

interface FileLocationHelperProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  format: string;
}

const FileLocationHelper = ({ isOpen, onClose, filename, format }: FileLocationHelperProps) => {
  const [activeTab, setActiveTab] = useState<'location' | 'troubleshooting' | 'settings'>('location');

  if (!isOpen) return null;

  const getDefaultDownloadPath = () => {
    // This is a general guide since we can't access the actual file system
    const platform = navigator.platform;
    if (platform.includes('Win')) {
      return 'C:\\Users\\[YourUsername]\\Downloads';
    } else if (platform.includes('Mac')) {
      return '/Users/[YourUsername]/Downloads';
    } else {
      return '/home/[YourUsername]/Downloads';
    }
  };

  const getSaveMethodInfo = () => {
    if ('showSaveFilePicker' in window) {
      return {
        method: 'modern',
        description: 'You were able to choose where to save your file using the modern file picker.',
        icon: '✅'
      };
    } else {
      return {
        method: 'download',
        description: 'Your file was automatically downloaded to your default Downloads folder.',
        icon: '📁'
      };
    }
  };

  const saveMethod = getSaveMethodInfo();

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return '📄';
      case 'Excel': return '📊';
      case 'CSV': return '💾';
      default: return '📁';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return '#ef4444';
      case 'Excel': return '#10b981';
      case 'CSV': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'PDF': return 'Text file (can be opened in any text editor)';
      case 'Excel': return 'CSV file (opens in Excel and other spreadsheet apps)';
      case 'CSV': return 'CSV file (compatible with all data applications)';
      default: return 'Data file';
    }
  };

  return (
    <div className="file-location-overlay">
      <div className="file-location-modal">
        <div className="modal-header">
          <div className="file-info">
            <span 
              className="format-icon"
              style={{ backgroundColor: getFormatColor(format) }}
            >
              {getFormatIcon(format)}
            </span>
            <div>
              <h2>File Export Complete!</h2>
              <p className="filename">{filename}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            📍 File Location
          </button>
          <button 
            className={`tab-btn ${activeTab === 'troubleshooting' ? 'active' : ''}`}
            onClick={() => setActiveTab('troubleshooting')}
          >
            🔧 Troubleshooting
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Browser Settings
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'location' && (
            <div className="location-tab">
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>File Successfully Exported!</h3>
                <p>{saveMethod.description}</p>
                {saveMethod.method === 'download' && (
                  <p className="save-note">
                    <strong>Note:</strong> In modern browsers, you can choose where to save files. 
                    Try updating your browser for this feature.
                  </p>
                )}
              </div>

              <div className="file-details">
                <h4>File Details:</h4>
                <div className="detail-item">
                  <span className="label">Filename:</span>
                  <span className="value">{filename}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Format:</span>
                  <span className="value">{format} - {getFormatDescription(format)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Size:</span>
                  <span className="value">Generated on demand</span>
                </div>
              </div>

              <div className="download-location">
                <h4>📁 Default Download Location:</h4>
                <div className="location-path">
                  <code>{getDefaultDownloadPath()}</code>
                </div>
                <p className="location-note">
                  <strong>Note:</strong> This is the typical location. Your browser may have different settings.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'troubleshooting' && (
            <div className="troubleshooting-tab">
              <h3>Can't Find Your File?</h3>
              
              <div className="troubleshooting-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Check Downloads Folder</h4>
                    <p>Look in your system's Downloads folder first. This is usually the default location.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Check Browser Downloads</h4>
                    <p>Look at the bottom of your browser for a download notification or check the Downloads panel (Ctrl+J or Cmd+Shift+L).</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Search Your Computer</h4>
                    <p>Search for "{filename}" in your file explorer or finder to locate the file anywhere on your system.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Check Browser Settings</h4>
                    <p>Your browser might be set to ask where to save files or save them to a different location.</p>
                  </div>
                </div>
              </div>

              <div className="common-issues">
                <h4>Common Issues:</h4>
                <ul>
                  <li>Browser download blockers or security software</li>
                  <li>Insufficient disk space</li>
                  <li>File permissions issues</li>
                  <li>Browser cache problems</li>
                </ul>
                
                <div className="modern-browser-info">
                  <h4>💡 Modern Browser Feature:</h4>
                  <p>
                    If you're using a modern browser (Chrome 86+, Edge 86+, Firefox 111+), 
                    you should see a file picker that lets you choose exactly where to save your file. 
                    This gives you full control over file location!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <h3>Browser Download Settings</h3>
              
              <div className="browser-settings">
                <div className="browser-section">
                  <h4>🌐 Chrome/Edge</h4>
                  <ol>
                    <li>Go to <code>chrome://settings/downloads</code></li>
                    <li>Check "Ask where to save each file before downloading"</li>
                    <li>Or set a custom download location</li>
                  </ol>
                </div>

                <div className="browser-section">
                  <h4>🦊 Firefox</h4>
                  <ol>
                    <li>Go to <code>about:preferences#general</code></li>
                    <li>Scroll to "Downloads" section</li>
                    <li>Choose "Always ask you where to save files"</li>
                  </ol>
                </div>

                <div className="browser-section">
                  <h4>🦁 Safari (Mac)</h4>
                  <ol>
                    <li>Go to Safari → Preferences → General</li>
                    <li>Set "File download location" to your preferred folder</li>
                    <li>Or choose "Ask for each download"</li>
                  </ol>
                </div>
              </div>

              <div className="quick-actions">
                <h4>Quick Actions:</h4>
                <button className="action-btn" onClick={() => window.open('chrome://settings/downloads', '_blank')}>
                  Open Chrome Downloads Settings
                </button>
                <button className="action-btn" onClick={() => window.open('about:preferences#general', '_blank')}>
                  Open Firefox Downloads Settings
                </button>
                
                <div className="file-quality-note">
                  <h4>🔧 File Quality Improvements:</h4>
                  <p>
                    We've improved file generation to ensure files open correctly. Files now include:
                  </p>
                  <ul>
                    <li>PDF exports as readable text files (open in any text editor)</li>
                    <li>Proper UTF-8 encoding with BOM for Excel/CSV compatibility</li>
                    <li>Correct line endings for your operating system</li>
                    <li>Proper CSV escaping for special characters</li>
                    <li>Clean, readable content that won't appear blank</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileLocationHelper;
