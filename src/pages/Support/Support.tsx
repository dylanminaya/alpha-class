import React, { useState } from 'react';
import './Support.css';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'responded';
  createdAt: string;
}

const Support: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Problema con transferencia',
      message: 'No puedo realizar transferencias entre cuentas',
      status: 'responded',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      subject: 'Consulta sobre tarjetas',
      message: '¿Cómo puedo solicitar una tarjeta adicional?',
      status: 'pending',
      createdAt: '2024-01-15'
    }
  ]);

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Ve a Configuración > Seguridad > Cambiar Contraseña. Ingresa tu contraseña actual y la nueva contraseña.'
    },
    {
      id: 2,
      question: '¿Cuál es el límite de transferencias diarias?',
      answer: 'El límite estándar es de $10,000 por día. Puedes solicitar un aumento contactando a soporte.'
    },
    {
      id: 3,
      question: '¿Cómo activo la autenticación de dos factores?',
      answer: 'En Configuración > Seguridad > Autenticación de Dos Factores, sigue los pasos para configurar tu dispositivo.'
    },
    {
      id: 4,
      question: '¿Puedo congelar mi tarjeta desde la app?',
      answer: 'Sí, ve a Tarjetas > Selecciona tu tarjeta > Acciones > Congelar Tarjeta.'
    },
    {
      id: 5,
      question: '¿Cómo solicito un préstamo?',
      answer: 'Ve a la sección de Préstamos y completa el formulario de solicitud con tus datos personales y financieros.'
    },
    {
      id: 6,
      question: '¿Cuáles son las comisiones por transferencias?',
      answer: 'Las transferencias entre cuentas Alpha son gratuitas. Las transferencias a otros bancos tienen una comisión de $5.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMessage: ContactMessage = {
      id: Date.now(),
      name: contactForm.name,
      email: contactForm.email,
      subject: contactForm.subject,
      message: contactForm.message,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setMessages([...messages, newMessage]);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    alert('Mensaje enviado exitosamente. Te responderemos en 24-48 horas.');
  };

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <div className="support-page">
      <div className="support-container">
        <header className="support-header">
          <h1>📞 Soporte y Contacto</h1>
          <p>Estamos aquí para ayudarte con cualquier consulta</p>
        </header>

        <div className="support-content">
          {/* Contact Information */}
          <section className="contact-info">
            <h2>📧 Información de Contacto</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email</h3>
                <p>soporte@alpha.com</p>
                <span>Respuesta en 24-48 horas</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📱</div>
                <h3>Teléfono</h3>
                <p>+1 (555) 123-4567</p>
                <span>Lun-Vie 8:00 AM - 6:00 PM</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Chat en Vivo</h3>
                <p>Disponible 24/7</p>
                <span>Respuesta inmediata</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h3>Oficina Principal</h3>
                <p>123 Financial St.</p>
                <span>Ciudad, Estado 12345</span>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <h2>❓ Preguntas Frecuentes</h2>
            <div className="faq-list">
              {faqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {activeFAQ === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  {activeFAQ === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>✉️ Enviar Mensaje</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={5}
                  required
                  placeholder="Describe tu consulta o problema..."
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Enviar Mensaje
              </button>
            </form>
          </section>

          {/* Message History */}
          <section className="messages-section">
            <h2>📋 Historial de Mensajes</h2>
            <div className="messages-list">
              {messages.map(message => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <div className="message-info">
                      <h3>{message.subject}</h3>
                      <span className="message-date">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div 
                      className={`message-status ${message.status}`}
                    >
                      {message.status === 'responded' ? 'Respondido' : 'Pendiente'}
                    </div>
                  </div>
                  
                  <div className="message-details">
                    <p><strong>De:</strong> {message.name} ({message.email})</p>
                    <p className="message-content">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Support;
