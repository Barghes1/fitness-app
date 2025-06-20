import React, { useState } from 'react';
import '../styles/components/_goalForm.scss';

const GoalForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !description) return;
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Goal description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;
