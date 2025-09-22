import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterList from './CharacterList';
import { CharactersEnum, CharacterStatusEnum } from '../../types/enums';

jest.mock('../atoms/Card', () => {
  return function MockCard({ name, onClick, selected, onModalClick }: {
    name: string;
    onClick: () => void;
    selected?: boolean;
    onModalClick: () => void;
  }) {
    return (
      <div data-testid={`card-${name}`}>
        <span>{name}</span>
        <button onClick={onClick}>
          {selected ? 'Seleccionado' : 'Seleccionar'}
        </button>
        <button onClick={onModalClick}>
          Info
        </button>
      </div>
    );
  };
});

describe('CharacterList', () => {
  const mockCharacters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: CharacterStatusEnum.ALIVE,
      species: 'Human',
      type: '',
      gender: 'Male' as const,
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/rick.jpg',
      episode: [],
      url: 'https://example.com/character/1',
      created: '2017-11-04T18:48:46.250Z'
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: CharacterStatusEnum.ALIVE,
      species: 'Human',
      type: '',
      gender: 'Male' as const,
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.jpg',
      episode: [],
      url: 'https://example.com/character/2',
      created: '2017-11-04T18:48:46.250Z'
    }
  ];

  const defaultProps = {
    characters: mockCharacters,
    characterTypeId: CharactersEnum.CHARACTER_ONE,
    onCharacterClick: jest.fn(),
    isCharacterSelected: jest.fn(() => false),
    onModalClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todas las cards de personajes', () => {
    render(<CharacterList {...defaultProps} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('no renderiza nada con array vacío', () => {
    render(<CharacterList {...defaultProps} characters={[]} />);
    
    expect(screen.queryByTestId(/card-/)).not.toBeInTheDocument();
  });

  it('llama onModalClick cuando clickeas el botón Info', () => {
    render(<CharacterList {...defaultProps} />);
    
    const rickCard = screen.getByTestId('card-Rick Sanchez');
    const infoButton = rickCard.querySelector('button:last-child');
    
    expect(infoButton).not.toBeNull();
    fireEvent.click(infoButton!);
    
    expect(defaultProps.onModalClick).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('llama onClick cuando clickeas una card', () => {
    render(<CharacterList {...defaultProps} />);
    
    const rickCard = screen.getByTestId('card-Rick Sanchez');
    const rickButton = rickCard.querySelector('button');
    
    expect(rickButton).not.toBeNull();
    fireEvent.click(rickButton!);
    
    expect(defaultProps.onCharacterClick).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('muestra el estado correcto según isCharacterSelected', () => {
    const mockIsSelected = jest.fn((id) => id === 1);
    
    render(<CharacterList {...defaultProps} isCharacterSelected={mockIsSelected} />);
    
    expect(screen.getByText('Seleccionado')).toBeInTheDocument();
    expect(screen.getByText('Seleccionar')).toBeInTheDocument();
  });

  it('pasa las props correctas a cada Card', () => {
    render(<CharacterList {...defaultProps} />);
    
    expect(screen.getByTestId('card-Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByTestId('card-Morty Smith')).toBeInTheDocument();
  });

  it('maneja datos corruptos sin romper', () => {
    const corruptCharacters = [
      mockCharacters[0],
      {
        ...mockCharacters[0],
        id: 999,
        name: '',
        status: CharacterStatusEnum.UNKNOWN,
      },
      mockCharacters[1]
    ];

    render(<CharacterList {...defaultProps} characters={corruptCharacters} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('mantiene la navegación por teclado', () => {
    render(<CharacterList {...defaultProps} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabIndex', '-1');
    });
  });

  it('renderiza muchos personajes sin problemas', () => {
    const manyCharacters = Array.from({ length: 10 }, (_, i) => ({
      ...mockCharacters[0],
      id: i + 1,
      name: `Character ${i + 1}`
    }));

    render(<CharacterList {...defaultProps} characters={manyCharacters} />);
    
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 10')).toBeInTheDocument();
  });
});
