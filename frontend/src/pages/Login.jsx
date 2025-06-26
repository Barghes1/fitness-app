import React from 'react';
import AuthForm from '../components/AuthForm.jsx';

const Login = () => {
  return (
    <div className="page page--login">
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
