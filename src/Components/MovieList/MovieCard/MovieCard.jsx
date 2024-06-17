import React from "react";
import "./MovieCard.css";
import PropTypes from "prop-types";

const MovieCard = ({ image, title, rating }) => {
  return (
    <div className="movie-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
    </div>
  );
};

MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default MovieCard;
