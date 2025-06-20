import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/_notfound.scss'

const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Ой! Такої сторінки не існує.</p>
      <Link to="/">Повернутись на головну</Link>
    </div>
  );
};

export default NotFound;
