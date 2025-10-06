'use client';
import React from 'react';

import { useEpisodesCard } from '@/hooks/useEpisodesCard';
import StateMessage from '@/molecules/StateMessage';
import EpisodeList from '@/molecules/EpisodeList';

import styles from '@/styles/components/atoms/Card.module.css';

import { CharactersEnum } from '@/types/enums';
import { Character } from '@/types/rickAndMortyTypes';

interface EpisodesCardProps {
  id: CharactersEnum;
  character: Character | null;
}

const EpisodesCard = ({ id, character }: EpisodesCardProps) => {
  const { episodes, state, messages } = useEpisodesCard(id, character);

  const renderContent = () => {
    switch (state) {
      case 'no-character':
        return <StateMessage title={messages.title} message={messages.message} />;

      case 'loading':
        return <StateMessage type='loading' title='' message='' />;

      case 'error':
        return <StateMessage type='error' title={messages.title} message={messages.message} />;

      case 'empty':
        return <StateMessage title={messages.title} message={messages.message} />;

      case 'success':
        return (
          <div className='card-body'>
            <h5 className='card-title text-light mb-4 text-center'>
              <span className='text-rick'>{messages.title}</span>
            </h5>
            <EpisodeList episodes={episodes} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='col-lg-4 col-md-4 mb-3'>
      <div className={`card ${styles.characterCard}`}>{renderContent()}</div>
    </div>
  );
};

export default EpisodesCard;
