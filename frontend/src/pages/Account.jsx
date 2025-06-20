import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountContainer from '../containers/AccountContainer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Account = () => {
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    if (!id) {
      setProfileUser(user);
    } else {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/users/${id}`);
          setProfileUser(res.data);
        } catch (err) {
          console.error('Не вдалося завантажити профіль:', err);
        }
      };
      fetchUser();
    }
  }, [id, user]);

  if (!profileUser) return <div>Завантаження профілю...</div>;

  return (
    <div className="page page--account">
      <AccountContainer profileUser={profileUser} />
    </div>
  );
};

export default Account;
