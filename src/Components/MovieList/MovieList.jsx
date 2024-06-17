import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results[3]);
      setMovies(data.results);
    }
    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );
};

export default MovieList;
