import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PokeList from "./PokeList";
import Pokeball from "../lotties/Pokeball";
import PokeCard from "./PokeCard/PokeCard";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const searchRef = useRef();

  useEffect(() => {
    setSearchTerm("")
  }, [])

  async function handleSearch() {
    setSearchTerm(searchRef.current.value);
    setIsSearching(true);
    setIsLoading(true);

    if (searchTerm === "") {
      setIsLoading(false);
      setHasError(true); 
      setErrorMessage("Nothing to find...")
      return
    } 
  
    try {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      setIsLoading(false);
      setHasError(false);

      setSearchResult(response.data);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
      if (error.message === "Request failed with status code 404") {
        setErrorMessage("Pokemon not found! Try another one.");
      } else {
        setErrorMessage("Unknown error ocurred...");
      }
    }
  }

  return (
    <>
      <section className="hero is-light is-small">
        <div className="hero-body mt-6 pt-6">
          <div className="field is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-around is-align-items-center">
            <h1 className="title" style={{ margin: "auto 5px" }}>
              My Pokedex
            </h1>
            <div className="control m-1 is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-center">
              <input
                className="input m-2"
                type="text"
                placeholder="Enter Pokemon name or ID . . ."
                ref={searchRef}
                style={{
                  boxShadow: "3px 3px 0px black",
                  border: "2px solid black",
                  width: "250px",
                  height: "50px",
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="control m-1">
                <button
                  className="button is-info"
                  style={{
                    boxShadow: "3px 3px 0px black",
                    border: "2px solid black",
                    height: "50px",
                  }}
                  onClick={handleSearch}
                >
                  <strong>Search</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium">
        {!isSearching ? (
          <PokeList />
        ) : isLoading ? (
          <Pokeball lottieWidth="150px" lottieHeight="150px" />
        ) : (
          <>
            {hasError ? (
              errorMessage && (
                <div>
                  <figure
                    className="image is-96x96 has-background-info mb-6"
                    style={{ borderRadius: "100px", margin: "auto" }}
                  >
                    <img src="pokeball.png" alt="pokemon" />
                  </figure>
                  <div className="column is-half" style={{ margin: "auto" }}>
                    <h1 className="is-size-3 notification is-danger is-light has-text-centered">
                      {errorMessage}
                    </h1>
                  </div>
                </div>
              )
            ) : (
              <div className="columns is-centered">
                <div className="column is-half">
                  <PokeCard
                    name={searchResult.name}
                    url=""
                    hqSprite=""
                    pokemonId={searchResult.id}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
