import { useEffect, useState } from 'react';
import { Character, Episode } from '@/types/rickAndMortyTypes';
import { getEpisodesByUrls } from '@/services/rickAndMorty';

interface UseEpisodesReturn {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

export const useEpisodes = (character: Character | null): UseEpisodesReturn => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!character?.episode || character.episode.length === 0) {
      setEpisodes([]);
      return;
    }

    const abortController = new AbortController();

    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const episodeData = await getEpisodesByUrls(character.episode, abortController.signal);
        setEpisodes(episodeData);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error instanceof Error ? error.message : 'Error');
        }
        return setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();

    return () => abortController.abort();
  }, [character]);

  return { episodes, loading, error };
};
