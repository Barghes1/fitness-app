// src/components/FollowerCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton.jsx';
import '../styles/components/_followerCard.scss';

const FollowerCard = ({ user }) => {
  return (
    <div className="follower-card">
      <Link to={`/account/${user._id}`}>
        <img src={user.avatarUrl} alt={user.name} className="follower-card__avatar" />
      </Link>

      <div className="follower-card__info">
        <h4>
          <Link to={`/account/${user._id}`}>{user.name}</Link>
        </h4>
        <FollowButton targetUserId={user._id} />
      </div>
    </div>
  );
};

export default FollowerCard;
