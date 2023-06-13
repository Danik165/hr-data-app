import React from 'react';

const Card = ({ title, content, isEditable, onChange }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {isEditable
        ? <input type="text" value={content} onChange={onChange} className="card-content-input" />
        : <p className="card-content">{content}</p>
      }
    </div>
  );
};

export default Card;