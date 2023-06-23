import React from "react";

const profileInfoCard = ({ title, content, isEditable, onChange }) => {
  return (
    <div className="info-card">
      <h3 className="card-title">{title}</h3>
      {isEditable ? (
        <input
          type="text"
          value={content}
          onChange={onChange}
          className="card-content-input"
        />
      ) : (
        <p className="card-content">{content}</p>
      )}
    </div>
  );
};

export default profileInfoCard;
