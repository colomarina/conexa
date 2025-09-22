export interface CharacterHeaderType {
  title: string;
  characterName: string;
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  variant?: 'text-rick' | 'text-morty';
}
