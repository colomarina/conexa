import React from "react";

const Header = () => {
  return (
    <>
      <h1 className="display-1 fw-bold mb-3 rick-morty-title text-center">
        <span className="text-rick">RICK</span>
        <span className="text-portal mx-3">&</span>
        <span className="text-morty">MORTY</span>
      </h1>
      <p className="text-center lead text-light mb-3">
        Encuentra a tus personajes favoritos y descubre en qué episodios
        aparecen.
      </p>
    </>
  );
};

export default Header;
