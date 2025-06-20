import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx';
import axios from 'axios';

const PostList = ({ userId, awardId }) => {
  const [posts, setPosts] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const params = {};

        if (userId) params.user = userId;
        if (awardId) params.award = awardId;

        const res = await axios.get('http://localhost:4000/api/posts', {
          params,
        });

        setPosts(res.data.posts.reverse());
      } catch (err) {
        console.error('Помилка при завантаженні постів:', err.response?.data || err.message);
      }
    };

    fetchFilteredPosts();
  }, [userId, awardId]); // тепер залежить ТІЛЬКИ від фактичного userId/awardId

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      {/* форма тільки якщо постить поточний користувач */}
      {!userId && awardId && <PostForm onSubmit={handleNewPost} awardId={awardId} />}
      {userId === user?._id && !awardId && <PostForm onSubmit={handleNewPost} />}

      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};


export default PostList;
