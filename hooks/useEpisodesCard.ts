import { useMemo } from 'react';
import { CharactersEnum } from '@/types/enums';
import { Character } from '@/types/rickAndMortyTypes';
import { useEpisodes } from '@/hooks/useEpisodes';

interface EpisodeCardConfig {
  title: (name: string, count: number) => string;
  emptyMessage: (name: string) => string;
  noCharacterTitle: string;
  noCharacterMessage: string;
}

const EPISODE_CONFIGS: Record<CharactersEnum, EpisodeCardConfig> = {
  [CharactersEnum.CHARACTER_ONE]: {
    title: (name, count) => `Episodios solo con ${name} (${count})`,
    emptyMessage: name =>
      `Cero Episodios. Parece que ${name} no tiene episodios registrados en nuestro archivo.`,
    noCharacterTitle: 'Selecciona un Personaje',
    noCharacterMessage:
      'Elige un personaje para descubrir todos los episodios en los que aparece por su cuenta.',
  },
  [CharactersEnum.CHARACTER_TWO]: {
    title: (name, count) => `Episodios solo con ${name} (${count})`,
    emptyMessage: name =>
      `Cero Episodios. Parece que ${name} no tiene episodios registrados en nuestro archivo.`,
    noCharacterTitle: 'Selecciona un Personaje',
    noCharacterMessage:
      'Elige un personaje para descubrir todos los episodios en los que aparece por su cuenta.',
  },
  [CharactersEnum.CHARACTER_ONE_AND_TWO]: {
    title: (name, count) => `Episodios con ${name} (${count})`,
    emptyMessage: () =>
      'Información incompleta. No es posible buscar episodios compartidos porque uno de los personajes no tiene episodios listados.',
    noCharacterTitle: 'Selecciona dos Personajes',
    noCharacterMessage:
      'Elije un segundo personaje para encontrar los episodios que comparte con el primero.',
  },
};

export const useEpisodesCard = (id: CharactersEnum, character: Character | null) => {
  const { episodes, loading, error } = useEpisodes(character);

  const config = useMemo(() => EPISODE_CONFIGS[id], [id]);

  const state = useMemo(() => {
    if (!character) return 'no-character';
    if (loading) return 'loading';
    if (error) return 'error';
    if (episodes.length === 0) return 'empty';
    return 'success';
  }, [character, loading, error, episodes.length]);

  const messages = useMemo(() => {
    if (!character) {
      return {
        title: config.noCharacterTitle,
        message: config.noCharacterMessage,
      };
    }

    if (error) {
      return {
        title: 'Error de conexión',
        message:
          'No pudimos cargar los episodios. Por favor, verifica tu conexión a internet e inténtalo de nuevo.',
      };
    }

    if (episodes.length === 0) {
      return {
        title: config.title(character.name, 0),
        message: config.emptyMessage(character.name),
      };
    }

    return {
      title: config.title(character.name, episodes.length),
      message: '',
    };
  }, [character, error, episodes.length, config]);

  return {
    episodes,
    loading,
    error,
    state,
    messages,
  };
};
