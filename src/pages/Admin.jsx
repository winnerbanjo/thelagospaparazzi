import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const ADMIN_STORAGE_KEY = 'lagos-paparazzi-admin-access';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'lagospaparazzi-admin';

const pageStyle = {
  minHeight: '100vh',
  background: 'radial-gradient(circle at top left, rgba(0,0,0,0.04), transparent 30%), linear-gradient(180deg, #ffffff 0%, #fbfbf9 100%)',
  color: '#111111',
  padding: '28px 20px 72px'
};

const shellStyle = {
  maxWidth: '1240px',
  margin: '0 auto'
};

const panelStyle = {
  background: 'rgba(255,255,255,0.82)',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '28px',
  boxShadow: '0 18px 50px rgba(0,0,0,0.06)',
  backdropFilter: 'blur(12px)'
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.95)',
  color: '#111111',
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: '18px',
  padding: '16px 18px',
  outline: 'none',
  fontSize: '1rem'
};

const primaryButtonStyle = {
  background: '#111111',
  color: '#ffffff',
  border: 'none',
  borderRadius: '999px',
  padding: '14px 24px',
  fontWeight: 700,
  cursor: 'pointer'
};

const secondaryButtonStyle = {
  background: 'transparent',
  color: '#111111',
  border: '1px solid rgba(0,0,0,0.14)',
  borderRadius: '999px',
  padding: '14px 24px',
  fontWeight: 600,
  cursor: 'pointer'
};

const eyebrowStyle = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '0.74rem',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'rgba(17,17,17,0.54)'
};

const mutedStyle = {
  color: 'rgba(17,17,17,0.62)'
};

const statusStyles = {
  pending: { background: '#f6efe2', color: '#8a5a00' },
  confirmed: { background: '#e9f7ef', color: '#1f6b44' },
  completed: { background: '#edf5fb', color: '#245c8f' },
  cancelled: { background: '#fbeaea', color: '#9f3131' }
};

function formatDate(value) {
  if (!value) return 'No date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function formatCurrency(value) {
  if (!value) return 'Not set';
  return `₦${Number(value).toLocaleString('en-NG')}`;
}

function MetricCard({ label, value, note }) {
  return (
    <div style={{ ...panelStyle, padding: '22px 22px 20px' }}>
      <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>{label}</div>
      <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", marginBottom: '8px' }}>
        {value}
      </div>
      <div style={{ ...mutedStyle, fontSize: '0.95rem' }}>{note}</div>
    </div>
  );
}

function EmptyState({ title, body }) {
  return (
    <div style={{ ...panelStyle, padding: '48px 28px', textAlign: 'center', borderStyle: 'dashed' }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '10px', fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{ ...mutedStyle, maxWidth: '460px', margin: '0 auto' }}>{body}</p>
    </div>
  );
}

function AdminLogin({ password, setPassword, error, onSubmit }) {
  return (
    <div style={pageStyle}>
      <div style={{ ...shellStyle, maxWidth: '620px', paddingTop: '8vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ ...panelStyle, padding: '40px 34px' }}
        >
          <div style={{ marginBottom: '30px' }}>
            <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>Private Admin</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 9vw, 4.9rem)', lineHeight: 0.92, marginBottom: '14px', fontWeight: 600 }}>
              Bookings
            </h1>
            <p style={{ ...mutedStyle, fontSize: '1rem', maxWidth: '420px' }}>
              A clean private view for checking requests without affecting the public website.
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <label htmlFor="admin-password" style={{ display: 'block', marginBottom: '10px', fontSize: '0.92rem', color: 'rgba(17,17,17,0.72)' }}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              style={inputStyle}
            />

            {error ? (
              <div style={{ marginTop: '14px', borderRadius: '16px', padding: '12px 14px', background: '#fbefef', border: '1px solid rgba(159,49,49,0.12)', color: '#9f3131' }}>
                {error}
              </div>
            ) : null}

            <button type="submit" style={{ ...primaryButtonStyle, marginTop: '18px', width: '100%' }}>
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    setIsAuthorized(localStorage.getItem(ADMIN_STORAGE_KEY) === 'granted');
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchBookings = async () => {
      setDataError('');
      setLoadingBookings(true);

      try {
        const response = await api.get('/booking');
        setBookings(response.data?.data || []);
      } catch {
        setBookings([]);
        setDataError('Bookings are not loading right now. The admin page is up, but the API connection needs attention.');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [isAuthorized]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      setError('Incorrect password.');
      return;
    }

    localStorage.setItem(ADMIN_STORAGE_KEY, 'granted');
    setError('');
    setIsAuthorized(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthorized(false);
    setPassword('');
  };

  if (!isAuthorized) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        error={error}
        onSubmit={handleLogin}
      />
    );
  }

  const pendingCount = bookings.filter((booking) => booking.status === 'pending').length;
  const latestBooking = bookings[0];

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>Admin Dashboard</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 10vw, 5.5rem)', lineHeight: 0.9, marginBottom: '14px', fontWeight: 600 }}>
              Booking Desk
            </h1>
            <p style={{ ...mutedStyle, maxWidth: '650px', fontSize: '1rem' }}>
              A quieter private view for tracking incoming requests. Course management can be added later without touching the public website.
            </p>
          </div>

          <button onClick={handleLogout} style={secondaryButtonStyle}>
            Log Out
          </button>
        </div>

        {dataError ? (
          <div style={{ ...panelStyle, padding: '18px 20px', marginBottom: '20px', color: '#8c3a3a', background: '#fff8f7' }}>
            {dataError}
          </div>
        ) : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <MetricCard
            label="Total Bookings"
            value={loadingBookings ? '...' : bookings.length}
            note="All requests received so far."
          />
          <MetricCard
            label="Pending"
            value={loadingBookings ? '...' : pendingCount}
            note="Requests still waiting for a response."
          />
          <MetricCard
            label="Courses"
            value="Soon"
            note="Course tools will be added here later."
          />
        </div>

        {latestBooking ? (
          <section style={{ ...panelStyle, padding: '24px', marginBottom: '22px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '180px', height: '180px', borderRadius: '999px', background: 'rgba(0,0,0,0.03)' }} />
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ ...eyebrowStyle, marginBottom: '12px' }}>Latest Request</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', marginBottom: '8px', fontWeight: 600 }}>
                  {latestBooking.name}
                </h2>
                <p style={mutedStyle}>
                  {latestBooking.eventType} • {formatDate(latestBooking.eventDate)} • {latestBooking.location || 'Location not set'}
                </p>
              </div>
              <div style={{ alignSelf: 'flex-start', padding: '8px 12px', borderRadius: '999px', fontSize: '0.84rem', fontWeight: 700, ...(statusStyles[latestBooking.status] || statusStyles.pending) }}>
                {latestBooking.status || 'pending'}
              </div>
            </div>
          </section>
        ) : null}

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', alignItems: 'end', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ ...eyebrowStyle, marginBottom: '10px' }}>Requests</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.3rem', fontWeight: 600 }}>
                Recent Bookings
              </h2>
            </div>
            <p style={{ ...mutedStyle, maxWidth: '480px', textAlign: 'right' }}>
              Clean overview only for now. Course controls are intentionally deferred.
            </p>
          </div>

          {loadingBookings ? (
            <EmptyState title="Loading bookings" body="Fetching the latest requests from the API." />
          ) : bookings.length === 0 ? (
            <EmptyState title="No bookings yet" body="New booking requests will appear here as they come in from the website." />
          ) : (
            <div style={{ display: 'grid', gap: '14px' }}>
              {bookings.map((booking, index) => (
                <motion.article
                  key={booking._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.03 }}
                  style={{ ...panelStyle, padding: '22px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.85rem', lineHeight: 1, marginBottom: '8px', fontWeight: 600 }}>
                        {booking.name}
                      </h3>
                      <p style={mutedStyle}>
                        {booking.eventType} • {formatDate(booking.eventDate)}
                      </p>
                    </div>
                    <div style={{ alignSelf: 'flex-start', padding: '8px 12px', borderRadius: '999px', fontSize: '0.84rem', fontWeight: 700, ...(statusStyles[booking.status] || statusStyles.pending) }}>
                      {booking.status || 'pending'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '10px' }}>
                    <div>
                      <div style={eyebrowStyle}>Email</div>
                      <div style={{ marginTop: '6px' }}>{booking.email || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={eyebrowStyle}>Phone</div>
                      <div style={{ marginTop: '6px' }}>{booking.phone || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={eyebrowStyle}>Location</div>
                      <div style={{ marginTop: '6px' }}>{booking.location || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={eyebrowStyle}>Budget</div>
                      <div style={{ marginTop: '6px' }}>{formatCurrency(booking.budget)}</div>
                    </div>
                  </div>

                  {(booking.message || booking.specialRequirements) ? (
                    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                      <div style={eyebrowStyle}>Notes</div>
                      <div style={{ marginTop: '8px', ...mutedStyle, color: '#1a1a1a' }}>
                        {booking.message || booking.specialRequirements}
                      </div>
                    </div>
                  ) : null}
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
