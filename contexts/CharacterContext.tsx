import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

import { Character } from "types/rickAndMortyTypes";

interface CharacterContextType {
  character1: Character | null;
  character2: Character | null;
  character1And2: Character | null;
  setCharacter1: (data: Character) => void;
  cleanCharacter1: () => void;
  setCharacter2: (data: Character) => void;
  cleanCharacter2: () => void;
  setCharacter1And2: (data: Character) => void;
}

export const CharacterContext = createContext<CharacterContextType>({
  character1: null,
  character2: null,
  character1And2: null,
  setCharacter1: () => null,
  cleanCharacter1: () => null,
  setCharacter2: () => null,
  cleanCharacter2: () => null,
  setCharacter1And2: () => null,
});

export const useCharacterContext = () => useContext(CharacterContext);

export const characterReducer = (state: CharacterContextType, action: { type: string, payload: Character | null }) => {
  console.log(state, action)
  const actions = {
    setCharacter1: (payload: Character | null) => ({ ...state, character1: payload}),
    setCharacter2: (payload: Character | null) => ({ ...state, character2: payload}),
    setCharacter1And2: (payload: Character | null) => ({ ...state, character1And2: payload}),
  };
  return (actions[action.type as keyof typeof actions]?.(action.payload)) || state;
}


export const useCharacterReducer = (defaultValues: CharacterContextType) => {
  const [state, dispatch] = useReducer(characterReducer, defaultValues);

  const setCharacter1 = (character: Character) =>
    dispatch({ type: "setCharacter1", payload: character });

  const cleanCharacter1 = () => {
    dispatch({ type: "setCharacter1", payload: null });
    dispatch({ type: "setCharacter1And2", payload: null });
    toast.success('Se elimino correctamente el personaje 1')
  }
  
  const setCharacter2 = (character: Character) =>
    dispatch({ type: "setCharacter2", payload: character });
  
  const cleanCharacter2 = () => {
    dispatch({ type: "setCharacter2", payload: null });
    dispatch({ type: "setCharacter1And2", payload: null });
    toast.success('Se elimino correctamente el personaje 2')
  }
  
  const setCharacter1And2 = (character: Character) =>
    dispatch({ type: "setCharacter1And2", payload: character });

  return {
    ...state,
    setCharacter1,
    cleanCharacter1,
    setCharacter2,
    cleanCharacter2,
    setCharacter1And2
  };
};
