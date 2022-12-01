import React, { useState, useEffect } from "react";
import "./Pokemon.css";
import axios from "axios";

export default function Pokemon({
  active,
  onHide,
  pokemonName,
  pixelArt,
  pokemonIndex,
}) {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`
  const [ pokemonStats, setPokemonStats ] =useState({})

  const [type, setType] = useState([]);
  const [description, setDescription] = useState("");
  const [stats, setStats] = useState({
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    specialAttack: "",
    specialDefense: "",
  });
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [abilities, setAbilities] = useState("");

  useEffect(() => {
    getPokemonDetails();
    getPokemonDescription();
  }, []);

  async function getPokemonDetails() {
    await axios.get(pokemonUrl).then((response) => {
      setPokemonStats(response.data)
    });
  }

  async function getPokemonDescription() {
    await axios.get(pokemonSpeciesUrl).then((response) => {
      response.data.flavor_text_entries.map(flavor => {
        if(flavor.language.name === "en") {
          setDescription(flavor.flavor_text)
        }
      })
    });
  }

  return (
    <div className={`modal ${active}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {" "}
            <strong>{pokemonName}</strong>
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onHide}
          ></button>
        </header>

        <section className="modal-card-body">
          <figure className="pixel-art image is-128x128 has-background-light">
            <img src={pixelArt} alt="pokemon-pixel-art" />
          </figure>

        <p>Weight: {pokemonStats.weight}</p>
        <p>Height: {pokemonStats.height}</p>
        <p>{description}</p>

        </section>

        <footer className="modal-card-foot is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
          <span></span>

          <button className="button is-success" onClick={onHide}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
