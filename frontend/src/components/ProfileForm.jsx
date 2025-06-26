/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/components/_profileForm.scss';
import { AuthContext } from '../context/AuthContext';

const ProfileForm = ({ name: initialName, email: initialEmail }) => {
  const { user, token } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(initialName.split(' ')[0] || '');
  const [lastName, setLastName] = useState(initialName.split(' ')[1] || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [login, setLogin] = useState(user.login || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Оновлення основної інформації (тільки змінені поля)
      const updatedInfo = {};
      if (firstName !== user.firstName) updatedInfo.firstName = firstName;
      if (lastName !== user.lastName) updatedInfo.lastName = lastName;
      if (email !== user.email) updatedInfo.email = email;
      if (login !== user.login) updatedInfo.login = login;

      if (Object.keys(updatedInfo).length > 0) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users`, updatedInfo, {
          headers: { Authorization: token },
        });
      }

      // 2. Оновлення пароля, якщо заповнені поля
      if (currentPassword || newPassword || confirmNewPassword) {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
          setMessage('Будь ласка, заповніть всі поля для зміни пароля');
          return;
        }

        if (newPassword !== confirmNewPassword) {
          setMessage('Новий пароль та підтвердження не збігаються');
          return;
        }

        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/users/update-password`,
          { password: currentPassword, newPassword },
          { headers: { Authorization: token } }
        );
      }

      setMessage('Профіль успішно оновлено');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Помилка при оновленні профілю';
      setMessage(errMsg);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
    <h4>Загальна інформація</h4>
      <div className="profile-form__grid">
        <div className="profile-form__group">
          <label>Ім'я</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="profile-form__group">
          <label>Прізвище</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="profile-form__group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="profile-form__group">
          <label>Логін</label>
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
      </div>

      <h4>Зміна пароля</h4>
      <div className="profile-form__grid">
        <div className="profile-form__group">
          <label>Поточний пароль</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>

        <div className="profile-form__group">
          <label>Новий пароль</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        <div className="profile-form__group">
          <label>Підтвердіть новий пароль</label>
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </div>
      </div>

      <button type="submit">Підтвердити зміни</button>
      {message && <p className="profile-form__message">{message}</p>}
    </form>
  );
};

export default ProfileForm;
