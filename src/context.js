import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [cocktailList, setCocktailList] = useState([]);
  const [searchText, setSearchText] = useState("z");
  const fetchDrinks = useCallback(async () => {
    try {
      const response = await axios(`${url}${searchText}`);
      const data = await response.data;
      const { drinks } = data;

      if (drinks) {
        // turn array with complex terms into array with simple terms - options
        const newDrinks = drinks.map((drink) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            drink;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktailList(newDrinks);
      } else {
        setCocktailList([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchText]);
  useEffect(() => {
    fetchDrinks();
  }, [searchText, fetchDrinks]);
  return (
    <AppContext.Provider value={{ loading, cocktailList, setSearchText }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
