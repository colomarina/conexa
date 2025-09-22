import React from "react";
import { CharacterStatusEnum } from "types/enums";
import { Character } from "types/rickAndMortyTypes";
import styles from "@styles/components/organisms/ModalInfo.module.css";

interface ModalInfoType {
  character: Character;
  isSelected: boolean;
  onClose: () => void;
}

const ModalInfo = ({ character, isSelected, onClose }: ModalInfoType) => {
  const getStatusBadgeClass = (status: CharacterStatusEnum) => {
    const statusClasses = {
      [CharacterStatusEnum.ALIVE]: "badge bg-success",
      [CharacterStatusEnum.DEAD]: "badge bg-danger",
      [CharacterStatusEnum.UNKNOWN]: "badge bg-secondary",
    };
    return statusClasses[status] || "badge bg-secondary";
  };

  if (!character) return null;

  return (
    <div className={`modal fade show d-block ${styles.container}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles.characterCard}`}>
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-light">{character.name}</h5>
            {isSelected && (
              <div className="m-2">
                <span className="badge bg-warning text-dark">⭐</span>
              </div>
            )}
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <span className="text-light me-2">Estado:</span>
                  <span className={getStatusBadgeClass(character.status)}>
                    {character.status}
                  </span>
                </div>
                <p className="text-light">
                  <strong>Especie:</strong> {character.species}
                </p>
                <p className="text-light">
                  <strong>Tipo:</strong> {character.type}
                </p>
                <p className="text-light">
                  <strong>Ubicación:</strong> {character.location.name}
                </p>
                <p className="text-light">
                  <strong>Episodios:</strong> {character.episode.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
