export interface PaginationType {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  currentPage: number;
  totalPages: number;
  prevLabel?: string;
  nextLabel?: string;
}
