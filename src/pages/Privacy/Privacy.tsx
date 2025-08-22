import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="hero-content">
          <h1 className="hero-title">Privacy Policy</h1>
          <p className="hero-subtitle">
            How we protect and handle your personal information
          </p>
        </div>
        
        {/* Creative Privacy Illustration */}
        <div className="privacy-illustration">
          <div className="shield-container">
            <div className="shield-main">
              <div className="shield-border"></div>
              <div className="shield-inner">
                <div className="shield-pattern"></div>
              </div>
              <div className="shield-glow"></div>
            </div>
          </div>
          
          <div className="data-elements">
            <div className="data-block block-1">
              <div className="block-content">
                <div className="data-line"></div>
                <div className="data-line"></div>
                <div className="data-line"></div>
              </div>
            </div>
            <div className="data-block block-2">
              <div className="block-content">
                <div className="data-line"></div>
                <div className="data-line"></div>
              </div>
            </div>
            <div className="data-block block-3">
              <div className="block-content">
                <div className="data-line"></div>
              </div>
            </div>
          </div>
          
          <div className="security-features">
            <div className="lock-mechanism">
              <div className="lock-body"></div>
              <div className="lock-keyhole"></div>
              <div className="lock-shackle"></div>
            </div>
            
            <div className="encryption-symbols">
              <div className="symbol symbol-1">
                <div className="key-visual">
                  <div className="key-head"></div>
                  <div className="key-shaft"></div>
                  <div className="key-teeth"></div>
                </div>
              </div>
              <div className="symbol symbol-2">
                <div className="padlock-visual">
                  <div className="padlock-body"></div>
                  <div className="padlock-shackle"></div>
                  <div className="padlock-keyhole"></div>
                </div>
              </div>
              <div className="symbol symbol-3">
                <div className="shield-visual">
                  <div className="shield-shape"></div>
                  <div className="shield-pattern"></div>
                  <div className="shield-highlight"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="privacy-content">
        <div className="container">
          <div className="privacy-wrapper">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <div className="privacy-section">
              <h2>1. Introduction</h2>
              <p>
                At TrackIt, we are committed to protecting your privacy and ensuring the security of your 
                personal information. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you use our financial management platform.
              </p>
              <p>
                By using TrackIt, you consent to the data practices described in this policy. If you do 
                not agree with our policies and practices, please do not use our Service.
              </p>
            </div>

            <div className="privacy-section">
              <h2>2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>Name, email address, and contact information</li>
                <li>Account credentials and profile information</li>
                <li>Financial data you choose to input (income, expenses, invoices)</li>
                <li>Communication preferences and settings</li>
              </ul>
              
              <h3>Automatically Collected Information</h3>
              <p>When you use our Service, we automatically collect:</p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Performance and error logs</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li><strong>Provide Services:</strong> To deliver and maintain our financial management platform</li>
                <li><strong>Improve Services:</strong> To analyze usage patterns and enhance user experience</li>
                <li><strong>Communicate:</strong> To send important updates, security alerts, and support messages</li>
                <li><strong>Security:</strong> To protect against fraud, abuse, and unauthorized access</li>
                <li><strong>Compliance:</strong> To meet legal obligations and enforce our terms</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share 
                your information only in the following circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> With trusted third-party vendors who help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you explicitly authorize us to share specific information</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul>
                <li>End-to-end encryption for sensitive financial data</li>
                <li>Secure data centers with physical and digital security</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p>
                However, no method of transmission over the internet is 100% secure. We cannot guarantee 
                absolute security but are committed to maintaining the highest standards of protection.
              </p>
            </div>

            <div className="privacy-section">
              <h2>6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and 
                fulfill the purposes outlined in this policy. This includes:
              </p>
              <ul>
                <li>Account information while your account is active</li>
                <li>Financial data as required for tax and business purposes</li>
                <li>Communication records for customer support</li>
                <li>Legal compliance requirements</li>
              </ul>
              <p>
                You may request deletion of your data, subject to legal and contractual obligations.
              </p>
            </div>

            <div className="privacy-section">
              <h2>7. Your Rights and Choices</h2>
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience and analyze usage patterns:
              </p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our Service</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Security Cookies:</strong> Protect against fraud and abuse</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences, though disabling certain 
                cookies may affect Service functionality.
              </p>
            </div>

            <div className="privacy-section">
              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data during such transfers, 
                including:
              </p>
              <ul>
                <li>Standard contractual clauses approved by data protection authorities</li>
                <li>Adequacy decisions for certain countries</li>
                <li>Other appropriate safeguards as required by law</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>10. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you become aware that a child 
                has provided us with personal information, please contact us immediately.
              </p>
            </div>

            <div className="privacy-section">
              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by:
              </p>
              <ul>
                <li>Posting the new policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices within the Service</li>
              </ul>
              <p>
                Your continued use of the Service after such changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="privacy-section">
              <h2>12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>Privacy Officer:</strong> privacy@trackit.com</p>
                <p><strong>General Inquiries:</strong> hello@trackit.com</p>
                <p><strong>Address:</strong> TrackIt Privacy Team, 123 Business St, Tech City, TC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="privacy-cta">
        <div className="container">
          <h2>Questions About Your Privacy?</h2>
          <p>We're committed to transparency and protecting your data.</p>
          <div className="cta-buttons">
            <a href="mailto:privacy@trackit.com" className="cta-button primary">Contact Privacy Team</a>
            <Link to="/support" className="cta-button secondary">Get Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
