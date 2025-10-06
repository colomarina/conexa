'use client';
import React from 'react';

import CharacterHeader from '@/atoms/CharacterHeader';
import CharacterList from '@/molecules/CharacterList';
import Pagination from '@/molecules/Pagination';
import ModalInfo from '@/organisms/ModalInfo';
import LoadingSkeleton from '@/molecules/LoadingSkeleton';

import { CharactersEnum } from '@/types/enums';
import { Character, Info } from '@/types/rickAndMortyTypes';
import { useCharacterCard } from '@/hooks/useCharacterCard';
import { useCharactersFetch } from '@/hooks/useCharactersFetch';

interface CharacterCardProps {
  initialCharacters: Character[];
  initialInfo: Info;
  initialPage: number;
  id: CharactersEnum;
}

const CharacterCard = ({ initialCharacters, initialInfo, initialPage, id }: CharacterCardProps) => {
  const {
    characters,
    info,
    currentPage,
    loading,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
  } = useCharactersFetch({
    initialCharacters,
    initialInfo,
    initialPage,
  });

  const {
    modalData,
    setModalData,
    handleSelectCharacter,
    isCharacterSelected,
    headerConfig,
    handleCleanCharacter,
  } = useCharacterCard({ id });

  return (
    <>
      <div
        className={`col-md-6 ${
          id === CharactersEnum.CHARACTER_ONE ? 'border-end border-light' : ''
        }`}
      >
        <CharacterHeader
          title={headerConfig.title}
          characterName={headerConfig.characterName}
          isVisible={headerConfig.isVisible}
          onClick={handleCleanCharacter}
          className={headerConfig.className}
        />

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <CharacterList
              characters={characters}
              characterTypeId={id}
              onCharacterClick={handleSelectCharacter}
              isCharacterSelected={isCharacterSelected}
              onModalClick={setModalData}
            />
            <Pagination
              onPrev={handlePrev}
              onNext={handleNext}
              isPrevDisabled={isPrevDisabled}
              isNextDisabled={isNextDisabled}
              currentPage={currentPage}
              totalPages={info.pages}
            />
          </>
        )}
      </div>

      {modalData && (
        <ModalInfo
          character={modalData}
          isSelected={isCharacterSelected(modalData.id)}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
};

export default CharacterCard;
