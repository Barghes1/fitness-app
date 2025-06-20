import React from 'react';
import '../styles/components/_comment.scss';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <strong>{comment.author}:</strong> {comment.text}
      <div className="comment__date">{comment.date}</div>
    </div>
  );
};

export default Comment;
