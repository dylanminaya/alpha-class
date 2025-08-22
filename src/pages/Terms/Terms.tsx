import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="hero-content">
          <h1 className="hero-title">Terms of Service</h1>
          <p className="hero-subtitle">
            Please read these terms carefully before using TrackIt
          </p>
        </div>
        
        {/* Creative Terms Illustration */}
        <div className="terms-illustration">
          <div className="document-stack">
            <div className="document doc-1">
              <div className="doc-header"></div>
              <div className="doc-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
            <div className="document doc-2">
              <div className="doc-header"></div>
              <div className="doc-lines">
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
            <div className="document doc-3">
              <div className="doc-header"></div>
              <div className="doc-lines">
                <div className="line"></div>
              </div>
            </div>
          </div>
          
          <div className="legal-elements">
            <div className="scales-of-justice">
              <div className="scale-left">
                <div className="scale-pan"></div>
                <div className="scale-chain"></div>
              </div>
              <div className="scale-center"></div>
              <div className="scale-right">
                <div className="scale-pan"></div>
                <div className="scale-chain"></div>
              </div>
            </div>
            
            <div className="stamp">
              <div className="stamp-body"></div>
              <div className="stamp-text">APPROVED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-wrapper">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <div className="terms-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using TrackIt ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="terms-section">
              <h2>2. Description of Service</h2>
              <p>
                TrackIt is a financial management platform designed to help freelancers and small businesses 
                track income, manage expenses, generate invoices, and analyze financial data. The Service 
                includes web-based applications, mobile applications, and related services.
              </p>
            </div>

            <div className="terms-section">
              <h2>3. User Accounts</h2>
              <p>
                To use certain features of the Service, you must create an account. You are responsible for:
              </p>
              <ul>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information is accurate and up-to-date</li>
              </ul>
            </div>

            <div className="terms-section">
              <h2>4. Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload or transmit malicious code or harmful content</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
              </ul>
            </div>

            <div className="terms-section">
              <h2>5. Privacy and Data</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed 
                by our Privacy Policy. By using the Service, you consent to such collection and use.
              </p>
              <p>
                You retain ownership of your data. We will not sell, rent, or share your personal information 
                with third parties except as described in our Privacy Policy.
              </p>
            </div>

            <div className="terms-section">
              <h2>6. Payment Terms</h2>
              <p>
                Some features of the Service require a paid subscription. Payment terms, including pricing, 
                billing cycles, and cancellation policies, are clearly stated at the time of purchase.
              </p>
              <p>
                All fees are non-refundable except as required by law or as specifically stated in our 
                refund policy. We reserve the right to modify pricing with 30 days' notice.
              </p>
            </div>

            <div className="terms-section">
              <h2>7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by TrackIt and 
                are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, or lease any part of the Service without 
                our prior written consent.
              </p>
            </div>

            <div className="terms-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, TrackIt shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to 
                loss of profits, data, or use.
              </p>
              <p>
                Our total liability to you for any claims arising from the use of the Service shall not 
                exceed the amount you paid for the Service in the 12 months preceding the claim.
              </p>
            </div>

            <div className="terms-section">
              <h2>9. Termination</h2>
              <p>
                You may terminate your account at any time by contacting our support team. We may terminate 
                or suspend your account immediately, without prior notice, for conduct that we believe 
                violates these Terms or is harmful to other users or the Service.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately. We may delete 
                your account and data, though we may retain certain information as required by law.
              </p>
            </div>

            <div className="terms-section">
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any 
                material changes via email or through the Service. Your continued use of the Service 
                after such modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div className="terms-section">
              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the 
                jurisdiction in which TrackIt operates, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="terms-section">
              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> legal@trackit.com</p>
                <p><strong>Address:</strong> TrackIt Legal Department, 123 Business St, Tech City, TC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="terms-cta">
        <div className="container">
          <h2>Questions About Our Terms?</h2>
          <p>We're here to help clarify any questions you may have.</p>
          <div className="cta-buttons">
            <a href="mailto:legal@trackit.com" className="cta-button primary">Contact Legal Team</a>
            <Link to="/support" className="cta-button secondary">Get Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
