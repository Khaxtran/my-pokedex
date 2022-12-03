import React, { useState, useEffect } from "react";
import "./Pokemon.css";
import axios from "axios";
import { TYPE_COLOURS } from "./TypeColors";
import { IoScaleOutline } from "react-icons/io5";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { TbPokeball } from "react-icons/tb";

export default function Pokemon({
  active,
  onHide,
  pokemonName,
  pixelArt,
  pokemonIndex,
}) {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [specialAttack, setSpecialAttack] = useState("");
  const [specialDefense, setSpecialDefense] = useState("");
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    getPokemonDetails();
    getPokemonDescription();
  }, []);

  async function getPokemonDetails() {
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
    await axios.get(pokemonUrl).then((response) => {
      response.data.stats.map((stat) => {
        switch (stat.stat.name) {
          case "hp":
            hp = stat["base_stat"];
            break;
          case "attack":
            attack = stat["base_stat"];
            break;
          case "defense":
            defense = stat["base_stat"];
            break;
          case "speed":
            speed = stat["base_stat"];
            break;
          case "special-attack":
            specialAttack = stat["base_stat"];
            break;
          case "special-defense":
            specialDefense = stat["base_stat"];
            break;
          default:
        }
      });

      setHp(hp);
      setAttack(attack);
      setDefense(defense);
      setSpeed(speed);
      setSpecialAttack(specialAttack);
      setSpecialDefense(specialDefense);
      setWeight(response.data.weight / 10); // Convert from hectogram to kilogram
      setHeight(response.data.height / 10); // Convert from decimetres to metres
      setTypes(response.data.types);
      setAbilities(response.data.abilities);
    });
  }

  async function getPokemonDescription() {
    await axios.get(pokemonSpeciesUrl).then((response) => {
      response.data.flavor_text_entries.map((flavor) => {
        if (flavor.language.name === "en") {
          setDescription(flavor.flavor_text);
        }
      });
    });
  }

  function progressBarColour(value, min, max) {
    let percentage = (value / max) * 100;

    if (percentage <= 30) {
      return (
        <progress
          className="progress is-small is-danger"
          value={value}
          min={min}
          max={max}
        />
      );
    } else if (percentage >= 30 && percentage <= 50) {
      return (
        <progress
          className="progress is-small is-warning"
          value={value}
          min={min}
          max={max}
        />
      );
    } else if (percentage >= 50 && percentage <= 100) {
      return (
        <progress
          className="progress is-small is-success"
          value={value}
          min={min}
          max={max}
        />
      );
    } else {
      return (
        <progress
          className="progress is-small is-info"
          value={value}
          min={min}
          max={max}
        />
      );
    }
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
          <section className="body-top">
            <div className="sprite-background">
              <figure className="pixel-art">
                <img
                  className="pokemon-sprite"
                  src={pixelArt}
                  alt="pokemon-pixel-art"
                />
              </figure>
              <figure className="pokeball image">
                <img src="PokeBall.svg" alt="pokeball" />
              </figure>
            </div>
          </section>

          <hr className="solid"></hr>

          <div className="columns pokemon-info-container has-text-centered is-mobile">
            <div className="column">
              <div className="row info-title">
                <IoScaleOutline className="icon mx-1" />
                <small>Weight</small>
              </div>
              <div className="row title is-size-4">{weight} kg</div>
            </div>

            <div className="column">
              <div className="row info-title">
                <TbPokeball className="icon mx-1" />
                <small>Types</small>
              </div>
              <div className="row types-container">
                {types &&
                  types.map((type, i) => (
                    <div
                      className="type mx-1 px-1"
                      style={{ backgroundColor: TYPE_COLOURS[type.type.name] }}
                      key={i}
                    >
                      {type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)}
                    </div>
                  ))}
              </div>
            </div>

            <div className="column">
              <div className="row info-title">
                <AiOutlineColumnHeight className="icon mx-1" />
                <small>Height</small>
              </div>
              <div className="row title is-size-4">{height} m</div>
            </div>
          </div>

          <div className="notification">
            <h1 className="title is-size-5-fullhd is-size-5-touch is-size-5-mobile mb-2">
              About
            </h1>
            {description}
          </div>

          <div className="pokemon-stats columns is-vcentered is-mobile my-2">
            <div className="column">
              <div>
                <small>Hp</small>
              </div>
              <div>
                <small>Attack</small>
              </div>
              <div>
                <small>Defense</small>
              </div>
              <div>
                <small>Speed</small>
              </div>
              <div>
                <small>Sp. Atk</small>
              </div>
              <div>
                <small>Sp. Def</small>
              </div>
            </div>

            <div className="column stats-value has-text-right">
              <div>
                <small>{hp}</small>
              </div>
              <div>
                <small>{attack}</small>
              </div>
              <div>
                <small>{defense}</small>
              </div>
              <div>
                <small>{speed}</small>
              </div>
              <div>
                <small>{specialAttack}</small>
              </div>
              <div>
                <small>{specialDefense}</small>
              </div>
            </div>

            <div className="column is-three-quarters p-0 mt-1 mr-4">
              <div className="mb-3">{progressBarColour(hp, "0", "255")}</div>

              <div className="mb-3">
                {progressBarColour(attack, "0", "190")}
              </div>

              <div className="mb-3">
                {progressBarColour(defense, "0", "230")}
              </div>

              <div className="mb-3">{progressBarColour(speed, "0", "180")}</div>

              <div className="mb-3">
                {progressBarColour(specialAttack, "0", "190")}
              </div>

              <div>{progressBarColour(specialDefense, "0", "230")}</div>
            </div>
          </div>

          <div>
            {abilities &&
              abilities.map((ability, i) => (
                <div key={i}>{ability.ability.name}</div>
              ))}
          </div>
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
