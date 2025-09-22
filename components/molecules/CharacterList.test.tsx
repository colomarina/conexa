import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Character } from 'types/rickAndMortyTypes';
import { CharacterListType } from 'types/components/molecules/CharacterListType';
import { CharactersEnum, CharacterStatusEnum } from 'types/enums';
import CharacterList from './CharacterList';

jest.mock('../atoms/Card', () => {
  const MockCard: React.FC<{
    characterId: string;
    image: string;
    name: string;
    status: CharacterStatusEnum;
    species: string;
    onClick: () => void;
    selected?: boolean;
    onModalClick: () => void;
  }> = ({ name, onClick, selected, onModalClick }) => (
    <div data-testid={`card-${name}`}>
      <h3>{name}</h3>
      <button onClick={onClick} data-selected={selected}>
        {selected ? '★ Seleccionado' : 'Seleccionar'}
      </button>
      <button onClick={onModalClick}>Ver detalles</button>
    </div>
  );
  return MockCard;
});

describe('CharacterList', () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: CharacterStatusEnum.ALIVE,
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z'
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: CharacterStatusEnum.ALIVE,
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'unknown', url: '' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:48:46.250Z'
    }
  ];

  const defaultProps: CharacterListType = {
    characters: mockCharacters,
    characterTypeId: CharactersEnum.CHARACTER_ONE,
    onCharacterClick: jest.fn(),
    isCharacterSelected: jest.fn((id: number) => id === 1),
    onModalClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza la lista de personajes', () => {
    render(<CharacterList {...defaultProps} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('maneja lista vacía', () => {
    const emptyProps: CharacterListType = {
      ...defaultProps,
      characters: []
    };
    
    render(<CharacterList {...emptyProps} />);
    expect(screen.queryByTestId(/card-/)).not.toBeInTheDocument();
  });

  it('selecciona personaje correctamente', () => {
    render(<CharacterList {...defaultProps} />);
    
    const rickButton = screen.getByText('★ Seleccionado');
    expect(rickButton).toBeInTheDocument();

    const mortyButton = screen.getByText('Seleccionar');
    expect(mortyButton).toBeInTheDocument();
  });

  it('llama onCharacterClick con el personaje correcto', () => {
    render(<CharacterList {...defaultProps} />);
    
    const selectButtons = screen.getAllByText('Seleccionar');
    fireEvent.click(selectButtons[0]);
    
    expect(defaultProps.onCharacterClick).toHaveBeenCalledWith(mockCharacters[1]);
    expect(defaultProps.onCharacterClick).toHaveBeenCalledTimes(1);
  });

  it('llama onModalClick con el personaje correcto', () => {
    render(<CharacterList {...defaultProps} />);
    
    const detailButtons = screen.getAllByText('Ver detalles');
    fireEvent.click(detailButtons[0]);
    
    expect(defaultProps.onModalClick).toHaveBeenCalledWith(mockCharacters[0]);
    expect(defaultProps.onModalClick).toHaveBeenCalledTimes(1);
  });

  it('actualiza selección cuando cambia isCharacterSelected', () => {
    const { rerender } = render(<CharacterList {...defaultProps} />);
    
    expect(screen.getByText('★ Seleccionado')).toBeInTheDocument();
    expect(screen.getByText('Seleccionar')).toBeInTheDocument();

    const updatedProps: CharacterListType = {
      ...defaultProps,
      isCharacterSelected: jest.fn((id: number) => id === 2)
    };
    
    rerender(<CharacterList {...updatedProps} />);

    const selectedButtons = screen.getAllByText('★ Seleccionado');
    const unselectedButtons = screen.getAllByText('Seleccionar');
    
    expect(selectedButtons).toHaveLength(1);
    expect(unselectedButtons).toHaveLength(1);
  });

  it('renderiza muchos personajes sin problemas', () => {
    const manyCharacters: Character[] = Array.from({ length: 20 }, (_, i) => ({
      ...mockCharacters[0],
      id: i + 1,
      name: `Personaje ${i + 1}`
    }));

    const manyProps: CharacterListType = {
      ...defaultProps,
      characters: manyCharacters
    };

    render(<CharacterList {...manyProps} />);
    
    expect(screen.getByText('Personaje 1')).toBeInTheDocument();
    expect(screen.getByText('Personaje 20')).toBeInTheDocument();
  });

  it('no se rompe con datos incompletos', () => {
    const incompleteCharacters: Character[] = [
      { ...mockCharacters[0], name: '', image: '' },
      { ...mockCharacters[1], id: 999 }
    ];

    const incompleteProps: CharacterListType = {
      ...defaultProps,
      characters: incompleteCharacters
    };

    expect(() => {
      render(<CharacterList {...incompleteProps} />);
    }).not.toThrow();
  });
});
