import React from 'react';
import '../styles/components/_avatar.scss';

const Avatar = ({ url, size = 100 }) => {
  return (
    <img
      src={url}
      alt="User Avatar"
      className="avatar"
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;
