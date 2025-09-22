import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Card from "./Card";
import { CardType } from "types/components/atoms/CardType";
import { CharactersEnum, CharacterStatusEnum } from "types/enums";

jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    style?: React.CSSProperties;
    role?: string;
    'aria-hidden'?: boolean;
  }) => {
    return <img src={src} alt={alt} {...props} />;
  };
  return MockImage;
});

jest.mock('../../utilities/helpers', () => ({
  getWritingStatus: (status: CharacterStatusEnum) => {
    if (status === CharacterStatusEnum.ALIVE) return 'Vivo';
    if (status === CharacterStatusEnum.DEAD) return 'Muerto';
    return 'Desconocido';
  }
}));

describe("Card", () => {
  const defaultProps: CardType = {
    characterId: CharactersEnum.CHARACTER_ONE,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    name: "Rick Sanchez",
    status: CharacterStatusEnum.ALIVE,
    species: "Human",
    onClick: jest.fn(),
    onModalClick: jest.fn(),
    selected: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra la información básica del personaje", () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Vivo")).toBeInTheDocument();
  });

  it("cambia el color del badge según el estado", () => {
    const { rerender } = render(<Card {...defaultProps} />);
    
    let badge = screen.getByText("Vivo");
    expect(badge).toHaveClass("bg-success");

    rerender(<Card {...defaultProps} status={CharacterStatusEnum.DEAD} />);
    badge = screen.getByText("Muerto");
    expect(badge).toHaveClass("bg-danger");

    rerender(<Card {...defaultProps} status={CharacterStatusEnum.UNKNOWN} />);
    badge = screen.getByText("Desconocido");
    expect(badge).toHaveClass("bg-secondary");
  });

  it("muestra la estrella cuando está seleccionado", () => {
    render(<Card {...defaultProps} selected={true} />);
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("no muestra la estrella cuando no está seleccionado", () => {
    render(<Card {...defaultProps} selected={false} />);
    expect(screen.queryByText("⭐")).not.toBeInTheDocument();
  });

  it("llama onClick al hacer click en la card", () => {
    render(<Card {...defaultProps} />);
    
    fireEvent.click(screen.getByText("Rick Sanchez").closest('.card')!);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("llama onModalClick al hacer click en el botón Info", () => {
    render(<Card {...defaultProps} />);
    
    fireEvent.click(screen.getByText("ℹ️ Info"));
    expect(defaultProps.onModalClick).toHaveBeenCalledTimes(1);
  });

  it("el botón Info no propaga el click a la card", () => {
    render(<Card {...defaultProps} />);
    
    fireEvent.click(screen.getByText("ℹ️ Info"));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it("usa imagen placeholder cuando no hay imagen", () => {
    render(<Card {...defaultProps} image="" />);
    
    const img = screen.getByAltText("Rick Sanchez");
    expect(img).toHaveAttribute("src", "/placeholder.svg");
  });

  it("maneja estados desconocidos sin romperse", () => {
    render(<Card {...defaultProps} status={"RANDOM" as CharacterStatusEnum} />);
    
    expect(screen.getByText("Desconocido")).toBeInTheDocument();
  });
});
