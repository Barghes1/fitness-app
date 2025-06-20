import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div className="page page--login">
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
