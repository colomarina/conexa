import React from "react";
import Image from "next/image";

import styles from "@styles/components/atoms/Card.module.css";

import { getWritingStatus } from "utilities/helpers";

import { CardType } from "types/components/atoms/CardType";
import { CharacterStatusEnum } from "types/enums";

const Card = ({
  characterId,
  image,
  name,
  status,
  species,
  onClick,
  selected = false,
  onModalClick,
}: CardType) => {
  const getStatusClass = (status: CharacterStatusEnum) => {
    const statusColor = {
      [CharacterStatusEnum.ALIVE]: "badge bg-success",
      [CharacterStatusEnum.DEAD]: "badge bg-danger",
      [CharacterStatusEnum.UNKNOWN]: "badge bg-secondary",
    };
    return (
      statusColor[status as keyof typeof statusColor] || "badge bg-secondary"
    );
  };

  return (
    <div key={characterId} className="col-12">
      <div
        className={`card ${styles.characterCard} ${
          styles.characterCardHorizontal
        } ${selected ? styles.selected : ""}`}
        onClick={() => onClick()}
        style={{ cursor: "pointer" }}
      >
        <div className="row g-0">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className={`${styles.imageContainer}`}>
              <div className="position-relative h-100">
                <Image
                  role="presentation"
                  src={image || "/placeholder.svg"}
                  alt={name}
                  aria-hidden="true"
                  width={150}
                  height={150}
                  className={`${styles.characterImageFixed} img-fluid rounded-start`}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-body h-100 d-flex flex-column justify-content-between">
              <div className="d-flex gap-2 flex-column">
                <h5 className="card-title text-light text-truncate mb-0">
                  {name}
                </h5>
                <div className="d-flex gap-2 text-light mb-2">
                  <span className="d-block d-md-none">Estado:</span>
                  <span className={getStatusClass(status)}>
                    {getWritingStatus(status)}
                  </span>
                </div>
              </div>
              <div>
                <div className="d-flex gap-2 text-light mb-2 text-truncate">
                  <span>Especie:</span>
                  <span>{species}</span>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onModalClick();
                    }}
                    title="Ver información detallada"
                  >
                    ℹ️ Info
                  </button>
                  {selected && (
                    <div>
                      <span className="badge bg-warning text-dark">⭐</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
