import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      axios.get(`http://localhost:4000/api/users/${userId}`)
        .then(res => setUser(res.data))
        .catch(err => {
          console.error('Failed to fetch user', err);
          logout(); // очищаємо стан при невдачі
        });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
