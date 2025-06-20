import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AwardForm from '../components/AwardForm';
import AwardCard from '../components/AwardCard';
import '../styles/components/_awardsContainer.scss';
import { AuthContext } from '../context/AuthContext';

const AwardsContainer = () => {
  const [awards, setAwards] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/awards');
        setAwards(res.data);
      } catch (err) {
        console.error('Не вдалося завантажити нагороди:', err);
      }
    };

    fetchAwards();
  }, []);

  const handleAwardCreate = (newAward) => {
    setAwards((prevAwards) => [newAward, ...prevAwards]);
  };

  const handleDelete = (index) => {
    const updated = [...awards];
    updated.splice(index, 1);
    setAwards(updated);
  };

  const handleEdit = (index) => {
    const updated = [...awards];
    const content = prompt('Оновіть опис досягнення:', updated[index].content);
    if (content !== null && content.trim() !== '') {
      updated[index].content = content;
      setAwards(updated);
    }
  };

  return (
    <div className="awards-container">
      {user?.isAdmin && (
        <AwardForm onCreate={handleAwardCreate} />
      )}

      {awards.length === 0 ? (
        <div className="awards-empty">
          Наразі немає доступних досягнень.
        </div>
      ) : (
        <div className="awards-list">
          {awards.map((award, index) => (
            <AwardCard
              key={award._id || index}
              award={award}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEdit(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsContainer;
