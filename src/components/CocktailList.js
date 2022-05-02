import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktailList } = useGlobalContext();
  if (loading) {
    return (
      <section className='section'>
        <h2 className='section-title'>Loading...</h2>
        <Loading />
      </section>
    );
  }
  if (cocktailList.length < 1) {
    return (
      <>
        <h2 className='section-title'>
          No cocktails found matching your criteria!
        </h2>
      </>
    );
  }
  return (
    <section className='section'>
      <h2 className='section-title'>Cocktails</h2>
      <div className='cocktails-center'>
        {cocktailList.map((cocktail) => {
          return (
            <Link to={`/cocktail/${cocktail.id}`}>
              <Cocktail {...cocktail} key={cocktail.id} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CocktailList;
