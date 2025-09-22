import { CharacterStatusEnum } from "types/enums";
import { Character } from "types/rickAndMortyTypes";

export const getWritingStatus = (id: CharacterStatusEnum) => {
  const objWriting = {
    [CharacterStatusEnum.ALIVE]: 'Vivo',
    [CharacterStatusEnum.DEAD]: 'Muerto',
    [CharacterStatusEnum.UNKNOWN]: 'Desconocido'
  }
  return objWriting[id];
}

export const getPageFromUrl = (url: string) => {
  const match = url.match(/[?&]page=(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export const getCommonEpisodes = (character1: Character, character2: Character): string[] => {
  const set2 = new Set(character2.episode);
  return character1.episode.filter(ep => set2.has(ep));
};

export const formatDateToSpanish = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
