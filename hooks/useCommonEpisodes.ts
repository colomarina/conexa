import { useEffect } from 'react';
import { useCharacterContext } from '@/contexts/CharacterContext';
import { getCommonEpisodes } from '@/utilities/helpers';
import { CharacterStatusEnum } from '@/types/enums';

export const useCommonEpisodes = () => {
  const { character1, character2, character1And2, setCharacter1And2, cleanCharacter1And2 } =
    useCharacterContext();

  useEffect(() => {
    if (character1 && character2) {
      const commonEpisodes = getCommonEpisodes(character1, character2);

      setCharacter1And2({
        id: 0,
        status: CharacterStatusEnum.UNKNOWN,
        type: '',
        gender: 'unknown',
        origin: { name: '', url: '' },
        created: '',
        image: '',
        location: { name: '', url: '' },
        species: '',
        url: '',
        name: `${character1.name} y ${character2.name}`,
        episode: commonEpisodes,
      });
    } else if (character1And2) {
      cleanCharacter1And2();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character1, character2]);

  return { character1, character2, character1And2 };
};
