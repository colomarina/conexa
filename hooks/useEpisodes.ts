import { useEffect, useState } from "react";

import { getEpisodes } from "@services/rickAndMortyApi";

import { Character, Episode } from "types/rickAndMortyTypes";

export const useEpisodes = (character: Character | null) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!character?.episode) {
      setEpisodes([])
      return
    };

    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const episodeNumbers = character.episode.map((url: string) => parseInt(url.split('/').pop() ?? '0'));
        if (episodeNumbers.length === 0) {
          return setEpisodes([])
        }
        const response = await getEpisodes(episodeNumbers);
        const normalizeEpisodes = Array.isArray(response) ? response : [response]
        
        return setEpisodes(normalizeEpisodes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar episodios');
        return setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [character]);

  return { episodes, loading, error };
};
