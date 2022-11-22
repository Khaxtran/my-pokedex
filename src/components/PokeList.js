import React, { Component } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";

export default class PokeList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokedex: null,
  };

  async componentDidMount() {
    const response = await axios.get(this.state.url);
    this.setState({ pokedex: response.data["results"] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokedex ? (
          <div className="is-flex is-flex-wrap-wrap is-flex-direction-row is-justify-content-center">
            {this.state.pokedex &&
              this.state.pokedex.map((pokemon, i) => (
                <div key={i} className="m-4">
                  <PokeCard name={pokemon.name} url={pokemon.url}/>
                </div>
              ))}
          </div>
        ) : (
          <h1 className="title">Loading Pokedex</h1>
        )}
      </React.Fragment>
    );
  }
}
