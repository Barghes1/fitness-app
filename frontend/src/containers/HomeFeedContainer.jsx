import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post/Post.jsx';
import SearchBar from '../components/SearchBar.jsx';
import '../styles/components/_homeFeed.scss'

const HomeFeedContainer = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
        setPosts(res.data.posts.reverse());
      } catch (err) {
        console.error('Помилка при завантаженні постів:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const contentMatch = post.content.toLowerCase().includes(search.toLowerCase());

    const userFullName = post.user?.firstName && post.user?.lastName
      ? `${post.user.firstName} ${post.user.lastName}`.toLowerCase()
      : '';

    const nameMatch = userFullName.includes(search.toLowerCase());

    return contentMatch || nameMatch;
  });

  return (
    <div className="home-feed">
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />

      {loading ? (
        <p>Завантаження...</p>
      ) : filteredPosts.length === 0 ? (
        <div className="home-feed__empty">
          Поки що немає постів, які відповідають запиту.
        </div>
      ) : (
        filteredPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default HomeFeedContainer;
