import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AwardForm from '../components/AwardForm.jsx';
import AwardCard from '../components/AwardCard.jsx';
import '../styles/components/_awardsContainer.scss';
import { AuthContext } from '../context/AuthContext';

const AwardsContainer = () => {
  const [awards, setAwards] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/awards`);
        setAwards(res.data);
      } catch (err) {
        console.error('Не вдалося завантажити нагороди:', err);
      }
    };

    fetchAwards();
  }, []);

  const handleAwardCreate = newAward => {
    setAwards(prevAwards => [newAward, ...prevAwards]);
  };

  const handleAwardDelete = deletedId => {
    setAwards(prevAwards => prevAwards.filter(award => award._id !== deletedId));
  };

  return (
    <div className="awards-container">
      {user?.isAdmin && <AwardForm onCreate={handleAwardCreate} />}

      {awards.length === 0 ? (
        <div className="awards-empty">Наразі немає доступних досягнень.</div>
      ) : (
        <div className="awards-list">
          {awards.map(award => (
            <AwardCard key={award._id} award={award} onDelete={handleAwardDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsContainer;
