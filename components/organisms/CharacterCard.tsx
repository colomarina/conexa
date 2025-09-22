import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useCharacterContext } from '@contexts/CharacterContext';
import { useCharacter } from '@hooks/useCharacters';
import CharacterHeader from '@atoms/CharacterHeader';
import CharacterList from '@molecules/CharacterList';
import Pagination from '@molecules/Pagination';
import ModalInfo from '@organisms/ModalInfo';

import { CharactersEnum } from 'types/enums';
import { Character } from 'types/rickAndMortyTypes';

interface CharacterConfig {
  title: string;
  characterName: string;
  isVisible: boolean;
  onClick: () => void;
  className: string;
}

const CharacterCard = ({ id }: { id: CharactersEnum }) => {
  const [modalData, setModalData] = useState<Character | null>(null);
  const { character1, setCharacter1, cleanCharacter1, character2, setCharacter2, cleanCharacter2 } =
    useCharacterContext();
  const { characters, info, handlePrev, handleNext, currentPage, totalPages } = useCharacter(id);

  const handleOnClick = (character: Character) => {
    if (id === CharactersEnum.CHARACTER_ONE) setCharacter1(character);
    if (id === CharactersEnum.CHARACTER_TWO) setCharacter2(character);
    return toast.success(`Personaje ${id} seleccionado con éxito!`, {
      position: id === CharactersEnum.CHARACTER_ONE ? 'top-left' : 'top-right',
    });
  };

  const selectedCharacters = (characterId: number) => {
    if (id === CharactersEnum.CHARACTER_ONE) {
      return character1?.id == characterId;
    } else {
      return character2?.id == characterId;
    }
  };

  const onModalClick = (character: Character) => {
    setModalData(character);
  };

  const objCharacterHeader: Partial<Record<CharactersEnum, CharacterConfig>> = {
    [CharactersEnum.CHARACTER_ONE]: {
      title: 'Tu Personaje 1',
      characterName: character1 ? character1.name : '',
      isVisible: Boolean(character1),
      onClick: cleanCharacter1,
      className: 'justify-content-start',
    },
    [CharactersEnum.CHARACTER_TWO]: {
      title: 'Tu Personaje 2',
      characterName: character2 ? character2.name : '',
      isVisible: Boolean(character2),
      onClick: cleanCharacter2,
      className: 'justify-content-start',
    },
  };

  return (
    <>
      <div
        className={`col-md-6 ${
          id === CharactersEnum.CHARACTER_ONE ? 'border-end border-light' : ''
        }`}
      >
        {objCharacterHeader[id] && (
          <CharacterHeader
            title={objCharacterHeader[id].title}
            characterName={objCharacterHeader[id].characterName}
            isVisible={objCharacterHeader[id].isVisible}
            onClick={objCharacterHeader[id].onClick}
            className={objCharacterHeader[id].className}
          />
        )}
        <CharacterList
          characters={characters || []}
          characterTypeId={id}
          onCharacterClick={handleOnClick}
          isCharacterSelected={selectedCharacters}
          onModalClick={onModalClick}
        />
        <Pagination
          onPrev={handlePrev}
          onNext={handleNext}
          isPrevDisabled={!info.prev}
          isNextDisabled={!info.next}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      {modalData && (
        <ModalInfo
          character={modalData}
          isSelected={selectedCharacters(modalData.id)}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
};

export default CharacterCard;
