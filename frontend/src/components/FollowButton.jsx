import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/components/_followButton.scss';

const FollowButton = ({ targetUserId }) => {
  const { user, token } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !targetUserId || user._id === targetUserId) {
      setLoading(false);
      return;
    }

    const fetchFollowingStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/users/${user._id}`);
        const isAlreadyFollowing = res.data.followers?.some(f => f._id === targetUserId);
        setIsFollowing(isAlreadyFollowing);
      } catch (err) {
        console.error('Не вдалося перевірити статус підписки', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingStatus();
  }, [user, targetUserId]);

  const handleClick = async () => {
    if (!user || !token || user._id === targetUserId) return;

    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:4000/api/users/followers/${targetUserId}`, {
          headers: { Authorization: token },
        });
      } else {
        await axios.put(`http://localhost:4000/api/users/followers/${targetUserId}`, {}, {
          headers: { Authorization: token },
        });
      }

      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Помилка при зміні підписки:', err.response?.data || err.message);
    }
  };

  if (loading || user._id === targetUserId) return null;

  return (
    <button
      className={`follow-btn ${isFollowing ? 'unfollow' : 'follow'}`}
      onClick={handleClick}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
