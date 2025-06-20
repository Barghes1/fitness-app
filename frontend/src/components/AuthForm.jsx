import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/components/_authForm.scss';

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isLogin = mode === 'login';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    password: '',
    loginOrEmail: ''
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await axios.post(
        isLogin ? 'http://localhost:4000/api/users/login' : 'http://localhost:4000/api/users',
        isLogin
          ? { loginOrEmail: form.loginOrEmail, password: form.password }
          : {
              firstName: form.firstName,
              lastName: form.lastName,
              login: form.login,
              email: form.email,
              password: form.password
            }
      );
  
      if (isLogin) {
        login(res.data.token);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login/Register failed');
    }
  };
  

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

      {!isLogin && (
        <>
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="login" placeholder="Login" onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        </>
      )}

      {isLogin && (
        <input name="loginOrEmail" placeholder="Login or Email" onChange={handleChange} required />
      )}

      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />

      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

      {error && <p className="auth-form__error">{error}</p>}

      {isLogin ? (
        <p className="auth-form__switch">
          Ще не маєте акаунта? <Link to="/signup">Зареєструватися</Link>
        </p>
      ) : (
        <p className="auth-form__switch">
          Вже маєте акаунт? <Link to="/login">Увійти</Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
