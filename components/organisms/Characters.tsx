import React from 'react';

import CharacterCard from '@/organisms/CharacterCard';

import { CharactersEnum } from '@/types/enums';
import { getCharacters } from '@/services/rickAndMorty';

const Characters = async () => {
  try {
    const [charactersOne, charactersTwo] = await Promise.all([
      getCharacters(CharactersEnum.CHARACTER_ONE),
      getCharacters(CharactersEnum.CHARACTER_TWO),
    ]);

    return (
      <div className='row mb-4'>
        <CharacterCard
          initialCharacters={charactersOne.results}
          initialInfo={charactersOne.info}
          initialPage={CharactersEnum.CHARACTER_ONE}
          id={CharactersEnum.CHARACTER_ONE}
        />
        <CharacterCard
          initialCharacters={charactersTwo.results}
          initialInfo={charactersTwo.info}
          initialPage={CharactersEnum.CHARACTER_TWO}
          id={CharactersEnum.CHARACTER_TWO}
        />
      </div>
    );
  } catch (error) {
    // TODO: Mejorar este manejo de errores
    console.error('Error loading characters:', error);

    return (
      <div className='row mb-4'>
        <div className='col-12 text-center text-danger'>
          <h3>Error loading characters</h3>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default Characters;
