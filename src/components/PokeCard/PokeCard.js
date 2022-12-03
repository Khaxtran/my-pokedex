import React, { useState, useEffect } from "react";
import Pokeball from "../../lotties/Pokeball";
import Pokemon from "../Pokemon/Pokemon";
import "./PokeCard.css";

export default function PokeCard({ name, url, hqSprite, pokemonId }) {
  const [openModal, setOpenModal] = useState(false);
  const active = openModal ? "is-active" : "";
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const convertId = url.split("/")[url.split("/").length - 2];
  const pixelImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    convertId || pokemonId
  }.png`;
  const hqImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
    convertId || pokemonId
  }.png`;

  useEffect(() => {
    handleImageLoad();
  }, []);

  async function handleImageLoad() {
    setLoading(true);
    try {
      setLoading(false);
      let imageFetched = await hqImageUrl;
      setImage(imageFetched);
    } catch (error) {
      console.log(`Failed to load image: ${error}`);
    }
  }

  function openPokemonModal() {
    setOpenModal(true);
  }

  function closePokemonModal() {
    setOpenModal(false);
  }

  return (
    <>
      {openModal && (
        <Pokemon
          show={openModal}
          active={active}
          onHide={closePokemonModal}
          pokemonName={pokemonName}
          pokemonIndex={name}
          pixelArt={pixelImageUrl}
        />
      )}

      <div className="card pokecard m-3" onClick={openPokemonModal}>
        <div className="card-image pokemon-image pt-6">
          {hqSprite !== "" ? (
            <figure className="image is-4by3">
              <img className="p-5" src={image} alt="Placeholder" />
            </figure>
          ) : (
            <>
              {loading ? (
                <figure
                  className="image is-4by3"
                  style={{ position: "relative" }}
                >
                  <div
                    className="p-4"
                    style={{ position: "absolute", top: "50px", left: "85px" }}
                  >
                    <Pokeball lottieWidth="50px" lottieHeight="50px" />
                  </div>
                </figure>
              ) : (
                <>
                  <figure className="image">
                    <img className="p-4" src={image} alt="Placeholder" />
                  </figure>
                </>
              )}
            </>
          )}
        </div>

        <div className="pokemon-id is-size-2-fullhd is-size-2-desktop is-size-5-touch has-background-warning p-2">
          <strong>#{convertId || pokemonId}</strong>
        </div>

        <div className="p-2">
          <p className="title is-size-4-fullhd is-size-6-touch">{pokemonName}</p>
        </div>
      </div>
    </>
  );
}
