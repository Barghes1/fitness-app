import React, { useState, useContext } from 'react';
import '../../styles/components/_postForm.scss';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const PostForm = ({ onSubmit, awardId }) => {
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    let imageUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const uploadRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = uploadRes.data.imageUrl;
      } catch (uploadErr) {
        console.error('Помилка при завантаженні зображення:', uploadErr);
        return;
      }
    }

    const postData = {
      content,
      imageUrls: imageUrl ? [imageUrl] : [],
    };

    if (awardId) {
      postData.award = awardId;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, postData, {
        headers: { Authorization: token },
      });

      onSubmit(response.data);
      setContent('');
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Помилка при створенні поста:', error.response?.data || error.message);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Поділись своїм прогресом..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      {previewUrl && (
        <div className="post-form__image-preview">
          <img src={previewUrl} alt="Preview" />
        </div>
      )}

      <div className="post-form__controls">
        <label className="post-form__upload">
          Додати зображення
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
        <button type="submit">Опублікувати</button>
      </div>
    </form>
  );
};

export default PostForm;
