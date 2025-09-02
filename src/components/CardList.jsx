import React, { useState, useEffect } from 'react';
import Card from './Card';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/cards.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => {
        console.error('Failed to fetch cards:', err);
        setError('Failed to load projects.');
      });
  }, []);

  return (
    <section id="projects">
      <h2>My Interests</h2>
      {error && <p className="error">{error}</p>}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            image={card.image}
            alt={card.alt}
            tags={card.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default CardList;
