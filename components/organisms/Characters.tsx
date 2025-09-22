import React from "react";

import CharacterCard from "@organisms/CharacterCard";

import { CharactersEnum } from "types/enums";

const Characters = () => (
  <div className="row mb-4">
    <CharacterCard id={CharactersEnum.CHARACTER_ONE} />
    <CharacterCard id={CharactersEnum.CHARACTER_TWO} />
  </div>
);

export default Characters;
