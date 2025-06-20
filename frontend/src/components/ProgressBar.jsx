import React from 'react';
import '../styles/components/_progressBar.scss';

const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-bar__label">{percentage}%</div>
    </div>
  );
};

export default ProgressBar;
