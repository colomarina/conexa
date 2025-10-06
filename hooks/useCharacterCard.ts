'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCharacterContext } from '@/contexts/CharacterContext';
import { CharactersEnum } from '@/types/enums';
import { Character } from '@/types/rickAndMortyTypes';

interface UseCharacterCardProps {
  id: CharactersEnum;
}

export const useCharacterCard = ({ id }: UseCharacterCardProps) => {
  const [modalData, setModalData] = useState<Character | null>(null);

  const { character1, setCharacter1, cleanCharacter1, character2, setCharacter2, cleanCharacter2 } =
    useCharacterContext();

  const isCharacterOne = id === CharactersEnum.CHARACTER_ONE;

  const handleSelectCharacter = (character: Character) => {
    if (isCharacterOne) {
      setCharacter1(character);
    } else {
      setCharacter2(character);
    }

    toast.success(`Personaje ${id} seleccionado con éxito!`, {
      position: isCharacterOne ? 'top-left' : 'top-right',
    });
  };

  const isCharacterSelected = (characterId: number): boolean => {
    const selectedChar = isCharacterOne ? character1 : character2;
    return selectedChar?.id === characterId;
  };

  const handleCleanCharacter = () => {
    if (isCharacterOne) {
      cleanCharacter1();
    } else {
      cleanCharacter2();
    }
  };

  const getHeaderConfig = () => {
    const selectedChar = isCharacterOne ? character1 : character2;

    return {
      title: isCharacterOne ? 'Tu Personaje 1' : 'Tu Personaje 2',
      characterName: selectedChar?.name || '',
      isVisible: Boolean(selectedChar),
      className: 'justify-content-start',
    };
  };

  return {
    modalData,
    setModalData,
    handleSelectCharacter,
    isCharacterSelected,
    handleCleanCharacter,
    headerConfig: getHeaderConfig(),
  };
};
