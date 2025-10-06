'use client';
import React from 'react';

import EpisodesCard from '@/organisms/EpisodesCard';
import { useCommonEpisodes } from '@/hooks/useCommonEpisodes';

import { CharactersEnum } from '@/types/enums';

const Episodes = () => {
  const { character1, character2, character1And2 } = useCommonEpisodes();

  return (
    <div className='row'>
      <EpisodesCard id={CharactersEnum.CHARACTER_ONE} character={character1} />
      <EpisodesCard id={CharactersEnum.CHARACTER_ONE_AND_TWO} character={character1And2} />
      <EpisodesCard id={CharactersEnum.CHARACTER_TWO} character={character2} />
    </div>
  );
};

export default Episodes;
