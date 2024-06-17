import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import MovieList from "./Components/MovieList/MovieList";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <MovieList />
      <Footer />
    </>
  );
};

export default App;
