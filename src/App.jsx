import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/header";
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
  // <div className="App"></div>;
};

export default App;
