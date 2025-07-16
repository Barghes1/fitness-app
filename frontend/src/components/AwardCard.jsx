import React, { useContext, useEffect, useState } from 'react';
import PostList from './Post/PostList.jsx';
import '../styles/components/_awardCard.scss';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Progress from './ProgressBar.jsx';
import notFoundImage from '../assets/404.jpg';

const AwardCard = ({ award, onDelete }) => {
  const { user, token } = useContext(AuthContext);
  const [completedTasks, setCompletedTasks] = useState([]);

  const isAdmin = user?.isAdmin;

  const isCompletedByUser =
    Array.isArray(award.tasks) &&
    award.tasks.length > 0 &&
    completedTasks.length === award.tasks.length;

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user || isAdmin || !award._id) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`);
        const progress = res.data.awardsProgress?.find(
          entry => entry.award === award._id || entry.award?._id === award._id
        );

        if (progress) {
          setCompletedTasks(progress.completedTasks);
        }
      } catch (err) {
        console.error('Помилка при отриманні прогресу:', err.response?.data || err.message);
      }
    };

    fetchProgress();
  }, [user, award._id, isAdmin]);

  const handleToggle = async taskIndex => {
    let updatedTasks;
    if (completedTasks.includes(taskIndex)) {
      updatedTasks = completedTasks.filter(i => i !== taskIndex);
    } else {
      updatedTasks = [...completedTasks, taskIndex];
    }

    setCompletedTasks(updatedTasks);

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/progress/${award._id}`,
        { completedTasks: updatedTasks },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.error('Помилка при оновленні прогресу:', err.response?.data || err.message);
    }
  };

  const getImageSrc = url => {
    return url?.startsWith('http') ? url : `${process.env.REACT_APP_API_URL}${url}`;
  };

  const handleDelete = async () => {
    if (!window.confirm('Ти впевнений, що хочеш видалити цю нагороду?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/awards/${award._id}`, {
        headers: { Authorization: token },
      });
      if (onDelete) onDelete(award._id);
    } catch (err) {
      console.error('Помилка при видаленні нагороди:', err.response?.data || err.message);
    }
  };

  return (
    <div className={`award-card ${isCompletedByUser ? 'completed' : ''}`}>
      <div className="award-card__header">
        {award.imageUrl && (
          <div className="award-card__icon">
            <img
              src={getImageSrc(award.imageUrl)}
              alt="award"
              onError={e => {
                e.target.onerror = null;
                e.target.src = notFoundImage;
              }}
            />
          </div>
        )}
        <p>{award.content}</p>

        {isAdmin && (
          <button className="award-card__delete-button" onClick={handleDelete}>
            🗑 Видалити
          </button>
        )}
      </div>

      <div className="award-card__content">
        <span className="award-card__date">{new Date(award.date).toLocaleDateString()}</span>

        {Array.isArray(award.tasks) && award.tasks.length > 0 && (
          <>
            <Progress completed={completedTasks.length} total={award.tasks.length} />
            <ul className="award-card__tasks">
              {award.tasks.map((task, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      disabled={isAdmin || isCompletedByUser}
                      checked={completedTasks.includes(index)}
                      onChange={() => handleToggle(index)}
                    />
                    {task}
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {isCompletedByUser && <span className="award-card__badge">Completed</span>}

      <div className="award-card__posts">
        <PostList awardId={award._id} />
      </div>
    </div>
  );
};

export default AwardCard;
