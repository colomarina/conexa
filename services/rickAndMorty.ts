
import { Character, Info, Episode } from '@/types/rickAndMortyTypes';

interface CharactersResponse {
  info: Info;
  results: Character[];
}

const getApiUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export async function getCharacters(page = 1): Promise<CharactersResponse> {
  const url = getApiUrl(`/api/characters?page=${page}`);
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  return handleResponse<CharactersResponse>(res);
}

export async function getEpisodes(
  episodeNumbers: number[],
  signal?: AbortSignal
): Promise<Episode | Episode[]> {
  const episodeIds = episodeNumbers.join(',');
  const url = getApiUrl(`/api/episodes/${episodeIds}`);

  const res = await fetch(url, {
    signal,
    next: { revalidate: 3600 },
  });

  return handleResponse<Episode | Episode[]>(res);
}

export async function getEpisodesByUrls(urls: string[], signal?: AbortSignal): Promise<Episode[]> {
  if (urls.length === 0) return [];

  const episodeNumbers = urls
    .map(url => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1]);
    })
    .filter(num => num > 0);

  if (episodeNumbers.length === 0) return [];

  const response = await getEpisodes(episodeNumbers, signal);
  return Array.isArray(response) ? response : [response];
}
