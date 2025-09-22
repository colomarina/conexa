import React from "react";

import { PaginationType } from "types/components/molecules/PaginationType";

const Pagination = ({
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
  currentPage,
  totalPages,
  prevLabel = "< Anterior",
  nextLabel = "Siguiente >",
}: PaginationType) => (
  <div className="d-flex justify-content-between mt-3">
    <button
      type="button"
      className="btn btn-outline-light"
      onClick={onPrev}
      disabled={isPrevDisabled}
    >
      {prevLabel}
    </button>
    <div className="text-light">
      Página {currentPage} de {totalPages}
    </div>
    <button
      type="button"
      className="btn btn-outline-light"
      onClick={onNext}
      disabled={isNextDisabled}
    >
      {nextLabel}
    </button>
  </div>
);

export default Pagination;
