import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokeball from "../lotties/Pokeball";

export default function PokeCard({ name, url, hqSprite }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const pokemonId = url.split("/")[url.split("/").length - 2];
  const pixelImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
  const hqImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  useEffect(() => {
    handleImageLoad()
  }, [])

  async function handleImageLoad() {
    setLoading(true);
    try {
      setLoading(false)
      let imageFetched = await hqImageUrl
      setImage(imageFetched)
    } catch (error) {
      console.log(`Failed to load image: ${error}`)
    }
  }

  return (
    <div
      className="card"
      style={{
        position: "relative",
        width: "250px",
        height: "450px",
        boxShadow: "5px 5px 0px black",
        border: "5px solid black",
        borderRadius: "20px",
      }}
    >
      <div
        className="card-image has-background-light pt-6"
        style={{ borderRadius: "20px 20px 0px 0px" }}
      >
        {hqSprite !== "" ? (
          <figure className="image is-4by3">
            <img className="p-5" src={hqSprite} alt="Placeholder" />
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
              <figure className="image is-4by3">
                <img className="p-5" src={image} alt="Placeholder" />
              </figure>
            )}
          </>
        )}
      </div>

      <div
        className="is-size-3 has-background-warning p-2"
        style={{
          position: "absolute",
          top: "-5px",
          left: "-5px",
          borderRadius: "10px 0px 10px 0px",
          border: "3px solid black",
          boxShadow: "2px 3px 0px black",
        }}
      >
        <strong>#{pokemonId}</strong>
      </div>

      <div 
        style={{
          position: "absolute",
          bottom: "5px",
          right: "5px"
        }}
      >
        <figure className="image is-96x96">
          <img src={pixelImageUrl} alt="pokemon-pixel-art"/>
        </figure>
      </div>

      <div className="card-content">
        <div>
          <p className="title is-size-4">
            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
          </p>
        </div>

        <div className="content">
          <span>Fire</span>
          <span>Posion</span>
        </div>
      </div>
    </div>
  );
}
