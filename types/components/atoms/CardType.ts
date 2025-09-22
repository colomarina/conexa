import { CharactersEnum, CharacterStatusEnum } from "types/enums";

export interface CardType {
  characterId: CharactersEnum;
  image: string;
  name: string;
  status: CharacterStatusEnum;
  onClick: () => void;
  selected?: boolean;
  onModalClick: () => void;
}
