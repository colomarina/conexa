import React from "react";

import { BsXCircle } from "react-icons/bs";

import { CharacterHeaderType } from "types/components/atoms/CharacterHeaderType";

const CharacterHeader = ({
  title,
  characterName,
  isVisible,
  onClick,
  className = "",
  variant = "text-rick",
}: CharacterHeaderType) => (
  <div
    className={`col-12 d-flex flex-row align-items-center mb-1 ${className}`}
  >
    <h5 className="mb-0">
      <span className={`${variant} text-light`}>
        {title}: {characterName}
      </span>
    </h5>
    <button
      className={`btn ${isVisible ? "visible" : "invisible"}`}
      onClick={onClick}
    >
      <BsXCircle className="text-light" />
    </button>
  </div>
);

export default CharacterHeader;
