import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import '../../styles/components/_post.scss';
import Avatar from '../Avatar.jsx';
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import Comment from '../Comment.jsx';
import defaultAvatar from '../../assets/user.png';

const Post = ({ post }) => {
  const { user, token } = useContext(AuthContext);
  const avatarUrl = post.user?.avatarUrl || defaultAvatar;
  //'https://i.pravatar.cc/100'

  const [likes, setLikes] = useState(post.likes || []);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user._id));
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/post/${post._id}`);
        const formatted = res.data.map(c => ({
          id: c._id,
          text: c.content,
          author: `${c.user.firstName} ${c.user.lastName}`,
          date: new Date(c.date).toLocaleString()
        }));
        setComments(formatted.reverse());
      } catch (err) {
        console.error('Помилка при завантаженні коментарів:', err.response?.data || err.message);
      }
    };

    fetchComments();
  }, [post._id]);

  const handleLike = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/posts/${post._id}`,
        {},
        { headers: { Authorization: token } }
      );
      setLikes(res.data.likes);
      setIsLiked(res.data.likes.includes(user._id));
    } catch (err) {
      console.error('Помилка при оновленні лайка:', err.response?.data || err.message);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        {
          post: post._id,
          content: commentText
        },
        {
          headers: { Authorization: token }
        }
      );

      const newComment = {
        id: res.data._id,
        text: res.data.content,
        author: `${res.data.user.firstName} ${res.data.user.lastName}`,
        date: new Date(res.data.date).toLocaleString()
      };

      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (err) {
      console.error('Помилка при додаванні коментаря:', err.response?.data || err.message);
    }
  };

  const getFullImageUrl = (relativeUrl) => {
    return `${process.env.REACT_APP_API_URL}${relativeUrl}`;
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__user">
          <Avatar url={avatarUrl} size={40} />
          <div className="post__user-info">
            <Link to={`/account/${post.user._id}`} className="post__author">
              {post.user.firstName} {post.user.lastName}
            </Link>
            <span className="post__date">{new Date(post.date).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <p className="post__text">{post.content}</p>

      {post.imageUrls?.length > 0 && (
        <div className="post__image">
          <img src={getFullImageUrl(post.imageUrls[0])} alt="Post" />
        </div>
      )}

      <div className="post__actions">
        <button className="post__action" onClick={handleLike}>
          {isLiked ? <FaHeart /> : <FaRegHeart />} <span>{likes.length}</span>
        </button>
        <button className="post__action" onClick={() => setShowCommentForm(prev => !prev)}>
          <FaRegCommentDots /> <span>Comment</span>
        </button>
      </div>

      {showCommentForm && (
        <div className="post__comment-form">
          <textarea
            placeholder="Залишити коментар..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleAddComment}>Надіслати</button>
        </div>
      )}

      {comments.length > 0 && (
        <div className="post__comments">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
