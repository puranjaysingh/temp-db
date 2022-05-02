import React from "react";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useGlobalContext } from "../context";

const Home = () => {
  return (
    <>
      <SearchForm />
      <CocktailList />
    </>
  );
};

export default Home;
