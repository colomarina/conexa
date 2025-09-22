import React, { useEffect } from "react";

import { useCharacterContext } from "@contexts/CharacterContext";
import EpisodesCard from "@organisms/EpisodesCard"

import { getCommonEpisodes } from "utilities/helpers";

import { CharactersEnum, CharacterStatusEnum } from "types/enums";

const Episodes = () => {
  const { character1, character1And2, character2, setCharacter1And2 } = useCharacterContext();

  useEffect(() => {
    if (character1 && character2) {
      setCharacter1And2({
        id: 0,
        status: CharacterStatusEnum.UNKNOWN,
        type: "",
        gender: "unknown",
        origin: {
          name: "",
          url: "",
        },
        created: "",
        image: "",
        location: {
          name: "",
          url: "",
        },
        species: "",
        url: "",
        name: `${character1.name} y ${character2.name}`,
        episode: getCommonEpisodes(character1, character2),
      });
    }
  }, [character1, character2, setCharacter1And2]);
  return (
    <div className="row">
      <EpisodesCard id={CharactersEnum.CHARACTER_ONE} character={character1} />
      <EpisodesCard id={CharactersEnum.CHARACTER_ONE_AND_TWO} character={character1And2} />
      <EpisodesCard id={CharactersEnum.CHARACTER_TWO} character={character2} />
    </div>
  );
};

export default Episodes;
