import React from "react";

export default function Searchbar() {
  return (
    <div className="field is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
      <div className="control m-1">
        <input className="input" type="text" placeholder="Pokemon name" style={{boxShadow: "3px 3px 0px black", border: "2px solid black", width: "250px", height: "50px"}}/>
      </div>

      <div className="control m-1">
        <div className="button is-info" style={{boxShadow: "3px 3px 0px black", border: "2px solid black", height: "50px"}}><strong>Search</strong></div>
      </div>
    </div>
  );
}
