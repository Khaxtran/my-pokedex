import React, { useState, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import PokeList from "./PokeList";
import Pokeball from "../lotties/Pokeball";
import PokeCard from "./PokeCard";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const searchRef = useRef();

  const [fontDefault, setFontDefault] = useState("")

  async function handleSearch() {
    setIsSearching(true);
    setIsLoading(true);

    try {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchRef.current.value}`)
        .then((response) => {
          setSearchTerm(searchRef.current.value);
          setIsSearching(false);
          setIsLoading(false);
          setSearchResult(response.data);
          setFontDefault(searchResult.data.sprites.other["official-artwork"].front_default)
        });
    } catch (error) {
      setIsSearching(false);
      setIsLoading(false);
      setMessage({ error: `Pokemon not found: ${searchTerm}` });
    }
  }

  return (
    <>
      <section className="hero is-light is-medium">
        <Header />
        <div className="field is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
          <div className="control m-1">
            <input
              className="input"
              type="text"
              placeholder="Pokemon name"
              ref={searchRef}
              style={{
                boxShadow: "3px 3px 0px black",
                border: "2px solid black",
                width: "250px",
                height: "50px",
              }}
            />
          </div>

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
      </section>
      <section className="section is-medium">
        {isSearching ? (
          <PokeList />
        ) : (
          <>
            {isLoading ? (
              <Pokeball />
            ) : (
              <>
                {searchResult.data.sprites.other["official-artwork"].front_default === undefined ? (
                  message && (
                    <h1 className="notification is-light is-warning has-text-centered">
                      {message}
                    </h1>
                  )
                ) : (
                  <PokeCard
                    name={searchResult.name}
                    url=""
                    hqSprite={fontDefault}
                  />
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}
