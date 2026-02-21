import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: '48px'
        }}>
          <div style={{
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
            padding: '64px',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
              color: '#000000',
              letterSpacing: '-0.02em',
              marginBottom: '24px'
            }}>
              Maintenance Mode
            </h1>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              color: '#666666',
              lineHeight: 1.8,
              marginBottom: '32px'
            }}>
              We're currently updating the site. Please check back shortly.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '16px 32px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: 'none',
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
