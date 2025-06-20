import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import Account from './pages/Account.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import Awards from './pages/Awards.jsx';
import FollowersList from './pages/FollowersList.jsx';
import Header from './components/Header.jsx';

import NotFound from './pages/NotFound.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

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
