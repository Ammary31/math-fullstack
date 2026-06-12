import { useState } from 'react';
import api from '../services/api';
import { 
  LogIn, 
  UserPlus, 
  AlertCircle, 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  BookOpen, 
  Trophy, 
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import booksCapImg from '../assets/books_cap_3d.png';
import logo3dImg from '../assets/logo_3d.png';
import folderCheckImg from '../assets/folder_checkmark_3d.png';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.post('/api/auth/login', { email, password });
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        onLoginSuccess(user);
      } else {
        await api.post('/api/auth/register', { name, email, password, role });
        setSuccessMsg('Registration successful! Please log in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container-premium">
      {/* Animated background elements */}
      <div className="bg-sphere-premium sphere-1-premium"></div>
      <div className="bg-sphere-premium sphere-2-premium"></div>
      <div className="bg-sphere-premium sphere-3-premium"></div>
      <div className="bg-sphere-premium sphere-4-premium"></div>

      <div className="auth-layout-premium">
        
        {/* Left Section - Auth Form */}
        <div className="auth-form-section">
          {/* Logo */}
          <div className="auth-logo-premium">
            <div className="logo-icon-wrapper">
              <GraduationCap size={32} className="logo-icon" />
            </div>
            <div>
              <h1 className="logo-text">EduFlow</h1>
              <p className="logo-subtext">Learn. Teach. Grow.</p>
            </div>
          </div>

          {/* Form Title */}
          <div className="form-header-premium">
            <h2 className="form-title-premium">
              {isLogin ? '👋 Welcome Back' : '🚀 Start Learning'}
            </h2>
            <p className="form-subtitle-premium">
              {isLogin 
                ? 'Login to continue your learning journey' 
                : 'Create an account and join our community'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert-banner alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button className="alert-close" onClick={() => setError('')}>×</button>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="alert-banner alert-success">
              <Check size={20} />
              <span>{successMsg}</span>
              <button className="alert-close" onClick={() => setSuccessMsg('')}>×</button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form-premium">
            
            {/* Role Selection */}
            {!isLogin && (
              <div className="role-selector-premium">
                <label className="role-label">Choose your role</label>
                <div className="role-buttons-group">
                  <button
                    type="button"
                    className={`role-button ${role === 'student' ? 'active' : ''}`}
                    onClick={() => setRole('student')}
                  >
                    <GraduationCap size={22} />
                    <span>Student</span>
                    {role === 'student' && <Check size={18} className="check-icon" />}
                  </button>
                  <button
                    type="button"
                    className={`role-button ${role === 'teacher' ? 'active' : ''}`}
                    onClick={() => setRole('teacher')}
                  >
                    <User size={22} />
                    <span>Teacher</span>
                    {role === 'teacher' && <Check size={18} className="check-icon" />}
                  </button>
                </div>
              </div>
            )}

            {/* Name Input - Only for Register */}
            {!isLogin && (
              <div className="input-group-premium">
                <label className="input-label">Full Name</label>
                <div className="input-wrapper-premium">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    className="input-premium"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="input-group-premium">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper-premium">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  className="input-premium"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group-premium">
              <label className="input-label">Password</label>
              <div className="input-wrapper-premium">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-premium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit-premium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>Loading...</span>
                </>
              ) : isLogin ? (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <Sparkles size={18} />
                </>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="auth-toggle-premium">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="toggle-link"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="toggle-link"
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Demo Accounts */}
          <div className="demo-accounts-premium">
            <p className="demo-title">📌 Demo Accounts:</p>
            <div className="demo-row">
              <span className="demo-role">👨‍🏫 Teacher:</span>
              <code>teacher@eureka.com</code> / <code>password123</code>
            </div>
            <div className="demo-row">
              <span className="demo-role">👨‍🎓 Student:</span>
              <code>student-13@eureka.com</code> / <code>password123</code>
            </div>
          </div>
        </div>

        {/* Right Section - Features & Illustration */}
        <div className="auth-showcase-section">
          {/* Main Illustration */}
          <div className="showcase-illustration">
            <img 
              src={booksCapImg} 
              alt="Education" 
              className="showcase-img" 
            />
          </div>

          {/* Features Grid */}
          <div className="features-grid-premium">
            <div className="feature-card-premium">
              <div className="feature-icon-premium success">
                <BookOpen size={24} />
              </div>
              <h3>Quality Courses</h3>
              <p>Learn from expert educators with structured curriculums</p>
            </div>

            <div className="feature-card-premium">
              <div className="feature-icon-premium primary">
                <Trophy size={24} />
              </div>
              <h3>Track Progress</h3>
              <p>Monitor your achievements and reach your learning goals</p>
            </div>

            <div className="feature-card-premium">
              <div className="feature-icon-premium info">
                <Users size={24} />
              </div>
              <h3>Community</h3>
              <p>Connect with thousands of learners worldwide</p>
            </div>
          </div>

          {/* Stats Bottom */}
          <div className="stats-bar-premium">
            <div className="stat-item">
              <strong>10K+</strong>
              <span>Students</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>500+</strong>
              <span>Courses</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>4.9⭐</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
