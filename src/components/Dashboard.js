import React from "react";
import Header from "./Header";
import PokeList from "./PokeList";

export default function Dashboard() {
  return (
    <>
      <section className="hero is-light is-medium">
        <Header />
      </section>
      <section className="section is-medium">
        <PokeList />
      </section>
    </>
  );
}
