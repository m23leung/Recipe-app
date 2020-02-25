import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

//https://developer.edamam.com/edamam-docs-recipe-api

window.onbeforeunload = function() {
  console.log("HI");
  debugger;
}

const App = () => {

  const APP_ID = '030648ed';
  const APP_KEY = '0cc4572bd03c33e72442bdd61a2f847c';
  //const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(``);
  const [query, setQuery] = useState(`chicken`);
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
  <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit">
        Search
      </button>
      <a href="www.google.com">TEST</a>
    </form>
 
    <div className="recipes">
    {recipes.map(recipe => ( 
      <Recipe 
         
         title={recipe.recipe.label} 
         calories={recipe.recipe.calories}
         image={recipe.recipe.image} 
         ingredients={recipe.recipe.ingredients}
         />

    )) }
    </div>
  </div>
  );
}

export default App;
