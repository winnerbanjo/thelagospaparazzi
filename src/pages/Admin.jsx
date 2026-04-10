import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const ADMIN_STORAGE_KEY = 'lagos-paparazzi-admin-access';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'lagospaparazzi-admin';

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0d1117 0%, #111827 45%, #030712 100%)',
  color: '#f8fafc',
  padding: '32px 20px 80px'
};

const shellStyle = {
  maxWidth: '1180px',
  margin: '0 auto'
};

const cardStyle = {
  background: 'rgba(15, 23, 42, 0.76)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: '24px',
  backdropFilter: 'blur(18px)',
  boxShadow: '0 24px 80px rgba(2, 6, 23, 0.35)'
};

const inputStyle = {
  width: '100%',
  background: 'rgba(15, 23, 42, 0.9)',
  color: '#f8fafc',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  borderRadius: '16px',
  padding: '16px 18px',
  outline: 'none',
  fontSize: '1rem'
};

const buttonStyle = {
  background: '#f8fafc',
  color: '#0f172a',
  border: 'none',
  borderRadius: '999px',
  padding: '14px 22px',
  fontWeight: 700,
  cursor: 'pointer'
};

const mutedStyle = {
  color: 'rgba(226, 232, 240, 0.68)'
};

const statusStyles = {
  pending: { background: 'rgba(245, 158, 11, 0.14)', color: '#fbbf24' },
  confirmed: { background: 'rgba(34, 197, 94, 0.14)', color: '#4ade80' },
  completed: { background: 'rgba(56, 189, 248, 0.14)', color: '#38bdf8' },
  cancelled: { background: 'rgba(248, 113, 113, 0.14)', color: '#f87171' }
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

function AdminLogin({ password, setPassword, error, onSubmit }) {
  return (
    <div style={pageStyle}>
      <div style={{ ...shellStyle, maxWidth: '520px', paddingTop: '8vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ ...cardStyle, padding: '32px' }}
        >
          <div style={{ marginBottom: '24px' }}>
            <p style={{ ...mutedStyle, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.78rem', marginBottom: '12px' }}>
              Lagos Paparazzi Admin
            </p>
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', lineHeight: 1, marginBottom: '12px', fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 800 }}>
              Private Access
            </h1>
            <p style={mutedStyle}>
              Use the admin password to open bookings. This page is separate from the public website.
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <label htmlFor="admin-password" style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', color: '#cbd5e1' }}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
              style={inputStyle}
            />

            {error ? (
              <div style={{ marginTop: '14px', borderRadius: '14px', padding: '12px 14px', background: 'rgba(127, 29, 29, 0.35)', border: '1px solid rgba(248, 113, 113, 0.25)', color: '#fecaca' }}>
                {error}
              </div>
            ) : null}

            <button type="submit" style={{ ...buttonStyle, marginTop: '18px', width: '100%' }}>
              Enter Admin
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
  const [courses, setCourses] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    setIsAuthorized(localStorage.getItem(ADMIN_STORAGE_KEY) === 'granted');
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchAdminData = async () => {
      setDataError('');
      setLoadingBookings(true);
      setLoadingCourses(true);

      try {
        const [bookingsResponse, coursesResponse] = await Promise.allSettled([
          api.get('/booking'),
          api.get('/courses/public')
        ]);

        if (bookingsResponse.status === 'fulfilled') {
          setBookings(bookingsResponse.value.data?.data || []);
        } else {
          setBookings([]);
          setDataError('Bookings could not be loaded. Check that the API is online and `VITE_API_URL` points to it.');
        }

        if (coursesResponse.status === 'fulfilled') {
          setCourses(coursesResponse.value.data?.data || []);
        } else {
          setCourses([]);
        }
      } finally {
        setLoadingBookings(false);
        setLoadingCourses(false);
      }
    };

    fetchAdminData();
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

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ ...mutedStyle, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.78rem', marginBottom: '10px' }}>
              Admin Dashboard
            </p>
            <h1 style={{ fontSize: 'clamp(2.3rem, 6vw, 4.4rem)', lineHeight: 0.95, marginBottom: '12px', fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 800 }}>
              Bookings First
            </h1>
            <p style={{ ...mutedStyle, maxWidth: '760px' }}>
              Separate admin area for incoming bookings. Courses are shown as a lightweight preview for now.
            </p>
          </div>

          <button onClick={handleLogout} style={buttonStyle}>
            Log Out
          </button>
        </div>

        {dataError ? (
          <div style={{ ...cardStyle, padding: '16px 18px', marginBottom: '22px', color: '#fecaca', borderColor: 'rgba(248, 113, 113, 0.2)' }}>
            {dataError}
          </div>
        ) : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '22px' }}>
          <div style={{ ...cardStyle, padding: '20px' }}>
            <p style={{ ...mutedStyle, marginBottom: '6px' }}>Total bookings</p>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{loadingBookings ? '...' : bookings.length}</div>
          </div>
          <div style={{ ...cardStyle, padding: '20px' }}>
            <p style={{ ...mutedStyle, marginBottom: '6px' }}>Pending</p>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>
              {loadingBookings ? '...' : bookings.filter((booking) => booking.status === 'pending').length}
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '20px' }}>
            <p style={{ ...mutedStyle, marginBottom: '6px' }}>Published courses</p>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{loadingCourses ? '...' : courses.length}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 0.9fr)', gap: '18px' }}>
          <section style={{ ...cardStyle, padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1.35rem', fontWeight: 700, marginBottom: '4px' }}>Recent bookings</h2>
                <p style={mutedStyle}>Latest requests from the website booking form.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '14px' }}>
              {loadingBookings ? (
                <div style={{ ...mutedStyle, padding: '12px 0' }}>Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div style={{ ...mutedStyle, padding: '12px 0' }}>No bookings found.</div>
              ) : (
                bookings.map((booking) => {
                  const statusStyle = statusStyles[booking.status] || statusStyles.pending;
                  return (
                    <article
                      key={booking._id}
                      style={{
                        border: '1px solid rgba(148, 163, 184, 0.14)',
                        borderRadius: '18px',
                        padding: '18px',
                        background: 'rgba(15, 23, 42, 0.5)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px', fontFamily: "'Inter', system-ui, sans-serif" }}>{booking.name}</h3>
                          <p style={mutedStyle}>{booking.eventType} • {formatDate(booking.eventDate)}</p>
                        </div>
                        <div style={{ alignSelf: 'flex-start', padding: '7px 11px', borderRadius: '999px', fontSize: '0.84rem', fontWeight: 700, ...statusStyle }}>
                          {booking.status || 'pending'}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                        <div>
                          <div style={mutedStyle}>Email</div>
                          <div>{booking.email || 'N/A'}</div>
                        </div>
                        <div>
                          <div style={mutedStyle}>Phone</div>
                          <div>{booking.phone || 'N/A'}</div>
                        </div>
                        <div>
                          <div style={mutedStyle}>Location</div>
                          <div>{booking.location || 'N/A'}</div>
                        </div>
                        <div>
                          <div style={mutedStyle}>Budget</div>
                          <div>{booking.budget ? `₦${Number(booking.budget).toLocaleString('en-NG')}` : 'Not set'}</div>
                        </div>
                      </div>

                      {(booking.message || booking.specialRequirements) ? (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(148, 163, 184, 0.12)' }}>
                          <div style={mutedStyle}>Notes</div>
                          <div>{booking.message || booking.specialRequirements}</div>
                        </div>
                      ) : null}
                    </article>
                  );
                })
              )}
            </div>
          </section>

          <aside style={{ display: 'grid', gap: '18px' }}>
            <section style={{ ...cardStyle, padding: '22px' }}>
              <h2 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Courses</h2>
              <p style={{ ...mutedStyle, marginBottom: '14px' }}>
                Public course preview for now. If you want full course management next, that should be done with proper backend admin auth.
              </p>

              <div style={{ display: 'grid', gap: '10px' }}>
                {loadingCourses ? (
                  <div style={mutedStyle}>Loading courses...</div>
                ) : courses.length === 0 ? (
                  <div style={mutedStyle}>No published courses found.</div>
                ) : (
                  courses.slice(0, 5).map((course) => (
                    <div key={course._id} style={{ border: '1px solid rgba(148, 163, 184, 0.14)', borderRadius: '16px', padding: '14px' }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{course.title}</div>
                      <div style={{ ...mutedStyle, fontSize: '0.94rem' }}>
                        {course.level || 'Course'} • {course.duration || 'Duration not set'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section style={{ ...cardStyle, padding: '22px' }}>
              <h2 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Password</h2>
              <p style={{ ...mutedStyle, marginBottom: '10px' }}>
                This admin gate is frontend-only for now.
              </p>
              <p style={mutedStyle}>
                Set `VITE_ADMIN_PASSWORD` in Vercel to replace the fallback password before relying on this in production.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
