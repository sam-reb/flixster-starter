import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard/MovieCard";
import Modal from "../Modal/Modal";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("filter-by");

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
  };

  const filteredMovies = movies
    .filter(
      (movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      // console.log("filering");
    )
    .sort((a, b) => {
      if (sortType === "alphabetic") {
        return a.title.localeCompare(b.title);
      } else if (sortType === "release_date") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortType === "rating") {
        return b.vote_average - a.vote_average;
      }
      return 0;
    });

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
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="sort-dropdown"
        >
          <option value="filter-by">--Filter By--</option>
          <option value="alphabetic">Alphabetically</option>
          <option value="release-date">Release Date</option>
          <option value="rating">Rating</option>
        </select>
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
          <h2 className="modal-title">{selectedMovie.title}</h2>
          <img
            className="modal-img"
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title}
            style={{ width: "800px", height: "auto" }}
          />
          <h3 className="modal-date">
            Release Date: {selectedMovie.release_date}
          </h3>
          <h4 className="modal-overview">Overview: {selectedMovie.overview}</h4>{" "}
        </Modal>
      )}
    </>
  );
};

export default MovieList;
