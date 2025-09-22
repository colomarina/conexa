import { renderHook, waitFor } from '@testing-library/react';
import { useEpisodes } from './useEpisodes';
import { getEpisodes } from '../services/rickAndMortyApi';
import { Character } from '../types/rickAndMortyTypes';
import { CharacterStatusEnum } from 'types/enums';

jest.mock('../services/rickAndMortyApi');
const mockGetEpisodes = getEpisodes as jest.MockedFunction<typeof getEpisodes>;

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
      'https://rickandmortyapi.com/api/episode/2'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  };

  const mockEpisodes = [
    { id: 1, name: 'Pilot', episode: 'S01E01' },
    { id: 2, name: 'Lawnmower Dog', episode: 'S01E02' }
  ];

  beforeEach(() => {
    mockGetEpisodes.mockClear();
  });

  it('inicializa con valores por defecto', () => {
    const { result } = renderHook(() => useEpisodes(null));
    
    expect(result.current.episodes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('no hace nada si no hay personaje', () => {
    const { result } = renderHook(() => useEpisodes(null));
    
    expect(mockGetEpisodes).not.toHaveBeenCalled();
    expect(result.current.episodes).toEqual([]);
  });

  it('carga episodios correctamente', async () => {
    mockGetEpisodes.mockResolvedValue(mockEpisodes);
    
    const { result } = renderHook(() => useEpisodes(mockCharacter));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.episodes).toEqual(mockEpisodes);
    expect(mockGetEpisodes).toHaveBeenCalledWith([1, 2]);
  });

  it('maneja un solo episodio (no array)', async () => {
    const singleEpisode = { id: 1, name: 'Pilot', episode: 'S01E01' };
    mockGetEpisodes.mockResolvedValue(singleEpisode);
    
    const { result } = renderHook(() => useEpisodes(mockCharacter));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.episodes).toEqual([singleEpisode]);
  });

  it('maneja errores del API', async () => {
    const errorMessage = 'Network error';
    mockGetEpisodes.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useEpisodes(mockCharacter));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.episodes).toEqual([]);
  });

  it('maneja errores que no son Error objects', async () => {
    mockGetEpisodes.mockRejectedValue('String error');
    
    const { result } = renderHook(() => useEpisodes(mockCharacter));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('Error al cargar episodios');
  });

  it('limpia episodios si el personaje no tiene episodes', () => {
    const characterWithoutEpisodes = { ...mockCharacter, episode: [] };
    
    const { result } = renderHook(() => useEpisodes(characterWithoutEpisodes));
    
    expect(result.current.episodes).toEqual([]);
    expect(mockGetEpisodes).not.toHaveBeenCalled();
  });

  it('maneja personajes sin episodios', () => {
    const characterWithoutEpisodes: Character = { 
      ...mockCharacter, 
      episode: [] 
    };
    
    const { result } = renderHook(() => useEpisodes(characterWithoutEpisodes));
    
    expect(result.current.episodes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(mockGetEpisodes).not.toHaveBeenCalled();
  });

  it('extrae correctamente los números de episodio de las URLs', async () => {
    mockGetEpisodes.mockResolvedValue(mockEpisodes);
    
    renderHook(() => useEpisodes(mockCharacter));
    
    await waitFor(() => {
      expect(mockGetEpisodes).toHaveBeenCalledWith([1, 2]);
    });
  });
});
