import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Avatar from '../components/Avatar.jsx';
import FollowButton from '../components/FollowButton.jsx';
import PostList from '../components/Post/PostList.jsx';
import { useParams } from 'react-router-dom';
import '../styles/components/_accountContainer.scss';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const AccountContainer = ({ profileUser: initialProfileUser }) => {
  const { user, token } = useContext(AuthContext);
  const { id } = useParams(); // якщо маршрут виглядає як /account/:id
  const [profileUser, setProfileUser] = useState(initialProfileUser || null);

  const isOwnProfile = !id || user._id === id;

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const userId = id || user._id;
        const res = await axios.get(`http://localhost:4000/api/users/${userId}`, {
          headers: { Authorization: token },
        });
        setProfileUser(res.data);
      } catch (err) {
        console.error('Помилка при завантаженні профілю:', err.response?.data || err.message);
      }
    };

    fetchProfileUser();
  }, [id, user._id, token]);

  if (!user || !profileUser) return null;

  const renderAchievements = () => {
    const progressList = profileUser.awardsProgress || [];
    const meaningfulProgress = progressList.filter(p =>
      p.completedTasks.length > 0 && p.award?.tasks?.length > 0
    );

    if (meaningfulProgress.length === 0) {
      return <p className="account-container__no-awards">Наразі немає досягнень.</p>;
    }

    return (
      <div className="account-container__achievements">
        <h3>Досягнення</h3>
        <div className="achievements-list">
          {meaningfulProgress.map((progress) => {
            const award = progress.award;
            const total = award.tasks.length;
            const completed = progress.completedTasks.length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const isCompleted = completed === total;
            const inProgress = completed > 0 && completed < total;

            return (
              <div
                key={award._id}
                className={`achievement ${isCompleted ? 'done' : inProgress ? 'progress' : ''}`}
              >
                <div className="achievement__title">
                  {award.imageUrl && (
                    <img
                      src={award.imageUrl.startsWith('/uploads') ? `http://localhost:4000${award.imageUrl}` : award.imageUrl}
                      alt="icon"
                      className="achievement__icon"
                    />
                  )}
                  <span>{award.content}</span>
                  {isCompleted && <FaCheckCircle color="#2ecc71" title="Завершено" />}
                  {inProgress && <FaClock color="#f39c12" title="У процесі" />}
                </div>
                <div className="achievement__bar">
                  <div className="achievement__bar-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <small>{percent}% виконано</small>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="account-container">
      <div className="account-container__header">
        <Avatar url={profileUser.avatarUrl || 'https://i.pravatar.cc/100'} />
        <div className="account-container__info">
          <h2>{profileUser.firstName} {profileUser.lastName}</h2>
          <p>{profileUser.followedBy?.length || 0} followers</p>
          {!isOwnProfile && <FollowButton targetUserId={profileUser._id} />}
        </div>
      </div>

      {renderAchievements()}

      <div className="account-container__posts">
        <h3>Пости</h3>
        <PostList userId={profileUser._id} />
      </div>
    </div>
  );
};

export default AccountContainer;
