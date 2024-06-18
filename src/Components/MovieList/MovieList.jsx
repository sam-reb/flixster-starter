import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const apiKey = import.meta.env.VITE_API_KEY;

  async function fetchMovies(page) {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
  }

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Function to handle 'Load More' button click
  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
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
      <div id="load-more">
        <button onClick={loadMoreMovies}>Load More</button>
      </div>
    </>
  );
};

export default MovieList;
