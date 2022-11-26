import React, { useState, useEffect, useRef } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";
import Pokeball from "../lotties/Pokeball";

export default function PokeList() {
  let offset = 0;
  const [isFetchingNextPage, setIsFetchingNextPage] = useState();
  const loadMoreRef = useRef();
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    loadMorePokemon();
    handleScroll();
  }, []);

  async function loadMorePokemon() {
    setIsFetchingNextPage(true);

    try {
      await axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
      .then((res) => {
        setIsFetchingNextPage(false);
        setPokedex((prevPokemon) => [...prevPokemon, ...res.data.results]);
      });
    offset += 20;
    } catch (error) {
      console.log(error)
    }
  }

  function handleScroll() {
    const hasMoreContent = loadMoreRef && loadMoreRef.current;
    const loadMoreContentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && loadMorePokemon());
      },
      {
        rootMargin: "50px",
      }
    );

    if (!hasMoreContent) return;

    loadMoreContentObserver.observe(hasMoreContent);
  }

  return (
    <>
      <div className="is-flex is-flex-wrap-wrap is-flex-direction-row is-justify-content-center">
        {pokedex &&
          pokedex.map((pokemon, i) => (
            <div key={i} className="m-2">
              <PokeCard name={pokemon.name} url={pokemon.url} hqSprite="" />
            </div>
          ))}
      </div>
      <div ref={loadMoreRef}>
        {isFetchingNextPage ? (
          <Pokeball lottieWidth="150px" lottieHeight="150px" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
