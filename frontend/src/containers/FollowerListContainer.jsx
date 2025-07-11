import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FollowerCard from '../components/FollowerCard.jsx';
import '../styles/components/_followerListContainer.scss';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/user.png';


const FollowerListContainer = () => {
  const { user, token } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`, {
          headers: { Authorization: token }
        });

        const followedByUsers = res.data.followedBy || [];

        const formatted = followedByUsers.map((u) => ({
          _id: u._id,
          name: `${u.firstName} ${u.lastName}`,
          avatarUrl: u.avatarUrl || defaultAvatar,
          isFollowing: user.followers.includes(u._id)
        }));

        setFollowers(formatted);
      } catch (err) {
        console.error('Помилка при завантаженні підписників:', err.response?.data || err.message);
      }
    };

    if (user?._id) {
      fetchFollowers();
    }
  }, [user, token]);

  return (
    <div className="follower-list-container">
      <div className="follower-list-wrapper">
        {followers.length === 0 ? (
          <div className="follower-list-empty">
            У вас ще немає підписників.
          </div>
        ) : (
          <div className="follower-list">
            {followers.map((u) => (
              <FollowerCard key={u._id} user={u} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowerListContainer;
