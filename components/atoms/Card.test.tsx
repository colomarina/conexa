import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Card from "./Card";
import { CharactersEnum, CharacterStatusEnum } from "../../types/enums";

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock('../../utilities/helpers', () => ({
  getWritingStatus: jest.fn((status: CharacterStatusEnum) => {
    const statusMap = {
      [CharacterStatusEnum.ALIVE]: 'Vivo',
      [CharacterStatusEnum.DEAD]: 'Muerto',
      [CharacterStatusEnum.UNKNOWN]: 'Desconocido'
    };
    return statusMap[status] || 'Desconocido';
  })
}));

describe("Card component", () => {
  const mockProps = {
    characterId: CharactersEnum.CHARACTER_ONE,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    name: "Rick Sanchez",
    status: CharacterStatusEnum.ALIVE,
    onClick: jest.fn(),
    onModalClick: jest.fn(),
    selected: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra la info básica del personaje", () => {
    render(<Card {...mockProps} />);
    
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toHaveAttribute("src", mockProps.image);
    expect(screen.getByText("Vivo")).toBeInTheDocument();
  });

  it("muestra el badge de status con la clase correcta", () => {
    render(<Card {...mockProps} />);
    
    const badge = screen.getByText("Vivo");
    expect(badge.className).toContain("bg-success");
  });

  it("muestra la estrella cuando está seleccionado", () => {
    render(<Card {...mockProps} selected={true} />);
    
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("no muestra la estrella cuando no está seleccionado", () => {
    render(<Card {...mockProps} selected={false} />);
    
    expect(screen.queryByText("⭐")).not.toBeInTheDocument();
  });

  it("llama onClick cuando se hace click en la card", () => {
    const { container } = render(<Card {...mockProps} />);
    
    const card = container.querySelector('.card');
    expect(card).not.toBeNull();
    fireEvent.click(card!);
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("llama onModalClick cuando se hace click en el botón Info", () => {
    render(<Card {...mockProps} />);
    
    const infoButton = screen.getByText("ℹ️ Info");
    fireEvent.click(infoButton);
    
    expect(mockProps.onModalClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).not.toHaveBeenCalled();
  });

  it("el botón Info tiene stopPropagation", () => {
    render(<Card {...mockProps} />);
    
    const infoButton = screen.getByTitle("Ver información detallada");
    expect(infoButton).toBeInTheDocument();
    expect(infoButton).toHaveTextContent("ℹ️ Info");
  });

  it("maneja imagen placeholder cuando no hay imagen", () => {
    render(<Card {...mockProps} image="" />);
    
    const img = screen.getByAltText("Rick Sanchez");
    expect(img).toHaveAttribute("src", "/placeholder.svg");
  });
});
