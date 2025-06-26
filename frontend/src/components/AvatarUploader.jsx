import React, { useRef, useContext, useState } from 'react';
import axios from 'axios';
import '../styles/components/_avatarUploader.scss';
import { AuthContext } from '../context/AuthContext';

const AvatarUploader = ({ currentAvatar }) => {
  const fileInputRef = useRef();
  const { token } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar || '');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/users`,
          { avatarUrl: base64Image },
          { headers: { Authorization: token } }
        );

        setAvatarUrl(base64Image);
        setMessage('Аватар успішно оновлено');
      } catch (err) {
        const errMsg = err.response?.data?.message || 'Помилка при оновленні аватара';
        setMessage(errMsg);
      }
    };

    reader.readAsDataURL(file);
  };


  return (
    <div className="avatar-uploader">
      <div className="avatar-uploader__preview-wrapper">
        <img src={avatarUrl} alt="Current Avatar" className="avatar-uploader__preview" />
      </div>

      <button type="button" onClick={() => fileInputRef.current.click()}>
        Змінити аватар
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleUpload}
        accept="image/*"
      />

      {message && <p className="avatar-uploader__message">{message}</p>}
    </div>
  );
};

export default AvatarUploader;
