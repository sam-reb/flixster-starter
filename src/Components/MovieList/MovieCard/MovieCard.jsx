import React from "react";
import "./MovieCard.css";
import PropTypes from "prop-types";

const MovieCard = ({ image, title, rating, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={image} alt={title} />
      <div className="card-details">
        <h3>{title}</h3>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default MovieCard;
