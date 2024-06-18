import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard/MovieCard";
import Modal from "../Modal/Modal";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  async function fetchMovies(page = 1) {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results[4]);

    if (data.results && data.results.length > 0) {
      setMovies((prevMovies) =>
        page === 1 ? data.results : [...prevMovies, ...data.results]
      );
    } else {
      if (page === 1) {
        setMovies([]);
      }
    }

    // setMovies((prevMovies) => [...prevMovies, ...data.results]);
  }

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Function to handle 'Load More' button click
  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    // fetchMovies();
  };

  const filteredMovies = movies.filter(
    (movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    // console.log("filering");
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
            onClick={() => setSelectedMovie(movie)}
            // onClick={() => console.log("clicked movie card")}
          />
        ))}
      </div>
      <div id="load-more">
        <button onClick={loadMoreMovies}>Load More</button>
      </div>
      {selectedMovie && (
        <Modal
          show={selectedMovie !== null}
          onClose={() => setSelectedMovie(null)}
        >
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            style={{ width: "100%" }}
          />
          <h3>Release Date: {selectedMovie.release_date}</h3>
          <h4>Overview: {selectedMovie.overview}</h4>{" "}
        </Modal>
      )}
    </>
  );
};

export default MovieList;
