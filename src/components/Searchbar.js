import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Searchbar() {
  const searchTermRef = useRef();
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    
  })

  function searchPokemon(searchTerm) {
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      .then((response) => {
        setIsLoading(false);
        const pokemon = []
        pokemon.push(response.data.name)
        pokemon.push(response.data.stats)
        setSearchResult(pokemon);
      });
  }

  function handleSearch() {
    searchPokemon(searchTermRef.current.value);
  }

  return (
    <div className="field is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
      <div className="control m-1">
        <input
          className="input"
          type="text"
          placeholder="Pokemon name"
          ref={searchTermRef}
          style={{
            boxShadow: "3px 3px 0px black",
            border: "2px solid black",
            width: "250px",
            height: "50px",
          }}
        />
      </div>

      <div className="control m-1">
        <div
          className="button is-info"
          style={{
            boxShadow: "3px 3px 0px black",
            border: "2px solid black",
            height: "50px",
          }}
          onClick={handleSearch}
        >
          <strong>Search</strong>
        </div>
      </div>

      {isLoading ? (
        <h1>Searching...</h1>
      ) : (
        <div>
          {searchResult &&
            searchResult.map((pokemon, i) => (
              <div key={i}>{pokemon.name}</div>
            ))}
        </div>
      )}
    </div>
  );
}
