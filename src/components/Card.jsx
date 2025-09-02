import React from 'react';

const Card = ({ title, description, image, alt, tags }) => {
  return (
    <div className="card" tabIndex="0">
      <img className="card-image" src={image} alt={alt} />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
