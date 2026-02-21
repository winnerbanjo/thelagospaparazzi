import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { setAuthToken } from '../utils/auth';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, formData);
      
      setAuthToken(response.data.token);
      navigate('/courses');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-luxury-silver/20 p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-luxury-silver mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-luxury-silver mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-void-black border border-luxury-silver/20 px-4 py-3 text-luxury-silver focus:border-regal-purple focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-luxury-silver mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-void-black border border-luxury-silver/20 px-4 py-3 text-luxury-silver focus:border-regal-purple focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-luxury-silver mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-void-black border border-luxury-silver/20 px-4 py-3 text-luxury-silver focus:border-regal-purple focus:outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 p-3 text-luxury-silver text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-regal-purple hover:bg-[#5a0a9a] text-luxury-silver py-3 px-8 font-bold transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          className="mt-4 text-luxury-silver/70 hover:text-luxury-silver text-sm"
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </motion.div>
    </div>
  );
}
