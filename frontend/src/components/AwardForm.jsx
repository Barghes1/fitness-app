import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/components/_awardForm.scss';
import { AuthContext } from '../context/AuthContext';

const AwardForm = ({ onCreate }) => {
  const { token } = useContext(AuthContext);

  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    let imageUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = res.data.imageUrl; // приклад: '/uploads/image-1718728237.png'
      } catch (err) {
        console.error('Помилка при завантаженні зображення:', err);
        return;
      }
    }

    const newAward = {
      content,
      imageUrl,
      tasks,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/awards`, newAward, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data) {
        onCreate(res.data);
        setContent('');
        setImageFile(null);
        setImagePreview('');
        setTasks([]);
        setNewTask('');
      }
    } catch (err) {
      console.error('Помилка при створенні нагороди:', err.response?.data?.message || err.message);
    }
  };

  return (
    <form className="award-form" onSubmit={handleSubmit}>
      <h3>Створити нову нагороду</h3>

      <textarea
        placeholder="Опис досягнення"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <div className="award-form__image-preview">
          <img src={imagePreview} alt="preview" />
        </div>
      )}

      <div className="award-form__tasks">
        <input
          type="text"
          placeholder="Нове завдання"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" onClick={handleAddTask}>
          Додати завдання
        </button>
      </div>

      {tasks.length > 0 && (
        <ul className="award-form__task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button type="button" onClick={() => handleRemoveTask(index)}>✖</button>
            </li>
          ))}
        </ul>
      )}

      <button type="submit">Додати нагороду</button>
    </form>
  );
};

export default AwardForm;
