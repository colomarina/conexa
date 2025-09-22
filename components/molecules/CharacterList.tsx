import React from "react";

import Card2 from "@atoms/Card";

import styles from "@styles/components/molecules/CharacterList.module.css";

import { CharacterListType } from "types/components/molecules/CharacterListType";

const CharacterList = ({
  characters,
  characterTypeId,
  onCharacterClick,
  isCharacterSelected,
  onModalClick,
}: CharacterListType) => {
  return (
    <div className={styles.scrollableList}>
      <div className="row row-gap-3 mx-0 mt-2">
        {characters.map((character) => (
          <div className="col-12 col-xl-6" key={character.id}>
            <Card2
              characterId={characterTypeId}
              image={character.image}
              name={character.name}
              status={character.status}
              species={character.species}
              onClick={() => onCharacterClick(character)}
              selected={isCharacterSelected(character.id)}
              onModalClick={() => onModalClick(character)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
