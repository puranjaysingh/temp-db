import React from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [singleCocktail, setSingleCocktail] = useState([]);
  const fetchDrink = async () => {
    try {
      const response = await axios(`${url}${id}`);
      const data = await response.data;

      const { drinks } = data;

      if (drinks) {
        const {
          idDrink: id,
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strGlass: glass,
          strCategory: category,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        const newCocktail = {
          id,
          name,
          image,
          glass,
          info,
          category,
          instructions,
          ingredients,
        };
        setSingleCocktail(newCocktail);
      } else {
        setSingleCocktail([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDrink();
  }, [id]);
  if (loading) {
    return (
      <section className='section cocktail-section'>
        <Loading />
      </section>
    );
  }
  if (!singleCocktail) {
    return (
      <section className='section cocktail-section'>
        <h2 className='section-title'>No cocktail found!</h2>
        <Link to='/' className='btn btn-primary'>
          Back Home
        </Link>
      </section>
    );
  }
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        Back Home
      </Link>
      <h2 className='section-title'>
        Cocktail: {singleCocktail.name}
        {console.log(singleCocktail)}
      </h2>
      <div className='drink'>
        <img src={singleCocktail.image} alt={singleCocktail.name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span>
            {singleCocktail.name}
          </p>
          <p>
            <span className='drink-data'>Alcoholic: </span>
            {singleCocktail.info}
          </p>
          <p>
            <span className='drink-data'>Glass: </span>
            {singleCocktail.glass}
          </p>
          <p>
            <span className='drink-data'>Category: </span>
            {singleCocktail.category}
          </p>
          <p>
            <span className='drink-data'>Instructions: </span>
            {singleCocktail.instructions}
          </p>
          <p>
            <span className='drink-data'>Ingredients: </span>
            {singleCocktail.ingredients.map((ingredient, index) => {
              return ingredient ? (
                <span key={index}>| {ingredient} |</span>
              ) : null;
            })}
          </p>
        </div>
      </div>
      );
    </section>
  );
};

export default SingleCocktail;
