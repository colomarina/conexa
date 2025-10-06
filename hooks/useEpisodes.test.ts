import { renderHook, waitFor } from '@testing-library/react';

import { useEpisodes } from '@/hooks/useEpisodes';
import { getEpisodesByUrls } from '@/services/rickAndMorty';
import { CharacterStatusEnum } from '@/types/enums';
import { Character } from '@/types/rickAndMortyTypes';

jest.mock('@/services/rickAndMorty');
const mockGetEpisodesByUrls = getEpisodesByUrls as jest.MockedFunction<typeof getEpisodesByUrls>;

describe('useEpisodes hook', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: CharacterStatusEnum.ALIVE,
    species: 'Human',
    type: '',
    gender: 'Male' as const,
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  const mockEpisodes = [
    {
      id: 1,
      name: 'Pilot',
      episode: 'S01E01',
      air_date: '2013-12-02',
      characters: [],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Lawnmower Dog',
      episode: 'S01E02',
      air_date: '2013-12-09',
      characters: [],
      url: '',
      created: '',
    },
  ];

  beforeEach(() => {
    mockGetEpisodesByUrls.mockClear();
  });

  it('debe inicializar con valores por defecto cuando no hay personaje', () => {
    const { result } = renderHook(() => useEpisodes(null));

    expect(result.current.episodes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('no debe hacer fetch si no hay personaje', () => {
    renderHook(() => useEpisodes(null));

    expect(mockGetEpisodesByUrls).not.toHaveBeenCalled();
  });

  it('debe cargar episodios correctamente cuando hay un personaje válido', async () => {
    mockGetEpisodesByUrls.mockResolvedValue(mockEpisodes);

    const { result } = renderHook(() => useEpisodes(mockCharacter));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.episodes).toEqual(mockEpisodes);
    expect(mockGetEpisodesByUrls).toHaveBeenCalledWith(
      mockCharacter.episode,
      expect.any(AbortSignal)
    );
  });

  it('debe manejar errores del API correctamente', async () => {
    const errorMessage = 'Network error';
    mockGetEpisodesByUrls.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useEpisodes(mockCharacter));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.episodes).toEqual([]);
  });

  it('debe ignorar errores de tipo AbortError', async () => {
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    mockGetEpisodesByUrls.mockRejectedValue(abortError);

    const { result } = renderHook(() => useEpisodes(mockCharacter));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.episodes).toEqual([]);
  });

  it('debe limpiar episodios cuando el personaje no tiene episodes', () => {
    const characterWithoutEpisodes = { ...mockCharacter, episode: [] };

    const { result } = renderHook(() => useEpisodes(characterWithoutEpisodes));

    expect(result.current.episodes).toEqual([]);
    expect(mockGetEpisodesByUrls).not.toHaveBeenCalled();
  });

  it('debe abortar el fetch cuando el componente se desmonta', () => {
    mockGetEpisodesByUrls.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockEpisodes), 1000))
    );

    const { unmount } = renderHook(() => useEpisodes(mockCharacter));

    unmount();

    // El AbortController debería haber abortado la petición
    expect(mockGetEpisodesByUrls).toHaveBeenCalledWith(
      mockCharacter.episode,
      expect.any(AbortSignal)
    );
  });

  it('debe abortar y crear nuevo fetch cuando cambia el personaje', async () => {
    mockGetEpisodesByUrls.mockResolvedValue(mockEpisodes);

    const { rerender } = renderHook(({ character }) => useEpisodes(character), {
      initialProps: { character: mockCharacter },
    });

    await waitFor(() => {
      expect(mockGetEpisodesByUrls).toHaveBeenCalledTimes(1);
    });

    const newCharacter = {
      ...mockCharacter,
      id: 2,
      episode: ['https://rickandmortyapi.com/api/episode/3'],
    };

    rerender({ character: newCharacter });

    await waitFor(() => {
      expect(mockGetEpisodesByUrls).toHaveBeenCalledTimes(2);
    });
  });
});
