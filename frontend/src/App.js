import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Account from './pages/Account';
import AccountSettings from './pages/AccountSettings';
import Awards from './pages/Awards';
import FollowersList from './pages/FollowersList';
import Header from './components/Header';

import NotFound from './pages/NotFound';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />


        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/:id"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />


        <Route
          path="/account/settings"
          element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }
        />
        <Route
          path="/awards"
          element={
            <PrivateRoute>
              <Awards />
            </PrivateRoute>
          }
        />
        <Route
          path="/followers"
          element={
            <PrivateRoute>
              <FollowersList />
            </PrivateRoute>
          }
        />

        
      </Routes>
    </Router>
  );
}

export default App;
