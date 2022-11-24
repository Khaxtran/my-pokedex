import React, { useState, useEffect, useRef } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";
import Pokeball from "../lotties/Pokeball";
import "./PokeList.css";

export default function PokeList() {
  let offset = 0;
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(true);
  const loadMoreRef = useRef();
  const [pokedex, setPokedex] = useState([]);
  //const pokecards = document.querySelectorAll(".pokecard");

  useEffect(() => {
    loadMorePokemon()
    window.addEventListener("scroll", handleScroll)
  }, [])

  function loadMorePokemon() {
    setIsFetchingNextPage(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${offset}`)
      .then((response) => {
        setIsFetchingNextPage(false);
        setPokedex((prevPokemon) => [...prevPokemon, ...response.data.results]);
      });

    offset += 50;
  }

  function handleScroll() {
    const bottom = loadMoreRef && loadMoreRef.current

    const loadObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && loadMorePokemon())
    }, {
      threshold: 1
    })

    if(!bottom) return

    loadObserver.observe(bottom)
  }
  
  return (
    <>
      <div className="card-container is-flex is-flex-wrap-wrap is-flex-direction-row is-justify-content-center">
        {pokedex &&
          pokedex.map((pokemon, i) => (
            <div key={i} className="m-2">
              <PokeCard name={pokemon.name} url={pokemon.url} />
            </div>
          ))}
      </div>
      <div ref={loadMoreRef}>{isFetchingNextPage ? <Pokeball /> : ""}</div>
    </>
  );
}
