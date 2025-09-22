import { CharactersEnum } from "types/enums";
import { Character } from "types/rickAndMortyTypes";

export interface CharacterListType {
  characters: Character[];
  characterTypeId: CharactersEnum;
  onCharacterClick: (character: Character) => void;
  onModalClick: (character: Character) => void;
  isCharacterSelected: (id: number) => boolean;
}
