import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProfileForm from '../components/ProfileForm.jsx';
import AvatarUploader from '../components/AvatarUploader.jsx';
import '../styles/components/_accountContainer.scss';

const AccountSettingsContainer = () => {
  const { user } = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState(null);

  useEffect(() => {
    if (user) setLoadedUser(user);
  }, [user]);

  if (!loadedUser) return null;

  return (
    <div className="account-settings-container">
      <AvatarUploader currentAvatar={loadedUser.avatarUrl} />
      <ProfileForm
        name={`${loadedUser.firstName} ${loadedUser.lastName}`}
        email={loadedUser.email}
      />
    </div>
  );
};

export default AccountSettingsContainer;
