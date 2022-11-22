import React from "react";

export default function PokeCard({ name, url }) {
  const pokemonId = url.split("/")[url.split("/").length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div
      className="card"
      style={{
        position: "relative",
        maxWidth: "300px",
        boxShadow: "5px 5px 0px black",
        border: "5px solid black",
        borderRadius: "20px",
      }}
    >
      <div
        className="card-image has-background-light pt-6"
        style={{ borderRadius: "20px 20px 0px 0px" }}
      >
        <figure className="image is-4by3">
          <img className="p-3" src={imageUrl} alt="Placeholder" />
        </figure>
      </div>

      <div
        className="is-size-3 has-background-warning p-2"
        style={{
          position: "absolute",
          top: "-5px",
          left: "-5px",
          borderRadius: "10px 0px 10px 0px",
          border: "3px solid black",
          boxShadow: "1px 1px 0px black",
        }}
      >
        <strong>#{pokemonId}</strong>
      </div>

      <div className="card-content">
        <div>
          <p className="title is-size-4">
            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
          </p>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
  );
}
