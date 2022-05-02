import React from "react";
import { useGlobalContext } from "../context";
import { useRef } from "react";

const SearchForm = () => {
  const { setSearchText } = useGlobalContext();
  const searchBox = React.useRef("");
  React.useEffect(() => {
    searchBox.current.focus();
  }, []);
  const handleChange = () => {
    setSearchText(searchBox.current.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search your favorite cocktail</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchBox}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
