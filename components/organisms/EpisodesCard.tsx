import React from "react";
import { CharactersEnum } from "types/enums";
import { Character } from "types/rickAndMortyTypes";
import { useEpisodes } from "@hooks/useEpisodes";
import StateMessage from "components/molecules/StateMessage";
import EpisodeList from "components/molecules/EpisodeList";
import styles from "@styles/components/atoms/Card.module.css";

const writingEpisodes = (id: CharactersEnum) => {
  const writing = {
    [CharactersEnum.CHARACTER_ONE]: {
      title: (name: string, number: number) =>
        `Episodios solo con ${name} (${number})`,
    },
    [CharactersEnum.CHARACTER_TWO]: {
      title: (name: string, number: number) =>
        `Episodios solo con ${name} (${number})`,
    },
    [CharactersEnum.CHARACTER_ONE_AND_TWO]: {
      title: (name: string, number: number) =>
        `Episodios con ${name} (${number})`,
    },
  };

  return writing[id as keyof typeof writing] || null;
};

const EpisodesCard = ({
  id,
  character,
}: {
  id: CharactersEnum;
  character: Character | null;
}) => {
  const { episodes, loading, error } = useEpisodes(character);

  const renderContent = () => {
    if (!character) {
      return (
        <StateMessage
          title={
            id === CharactersEnum.CHARACTER_ONE_AND_TWO
              ? "Selecciona dos Personajes"
              : "Selecciona un Personaje"
          }
          message={
            id === CharactersEnum.CHARACTER_ONE_AND_TWO
              ? "Elije un segundo personaje para encontrar los episodios que comparte con el primero."
              : "Elige un personaje para descubrir todos los episodios en los que aparece por su cuenta."
          }
        />
      );
    }

    if (loading) {
      return <StateMessage type="loading" title="" message="" />;
    }

    if (error) {
      return (
        <StateMessage
          type="error"
          title="Error de conexión"
          message="No pudimos cargar los episodios. Por favor, verifica tu conexión a internet e inténtalo de nuevo."
        />
      );
    }

    if (episodes.length === 0) {
      return (
        <StateMessage
          title={writingEpisodes(id).title(character.name, episodes.length)}
          message={
            id === CharactersEnum.CHARACTER_ONE_AND_TWO
              ? `Cero Episodios. Parece que ${character.name} no tiene episodios registrados en nuestro archivo.`
              : `Información incompleta. No es posible buscar episodios compartidos porque uno de los personajes no tiene episodios listados.`
          }
        />
      );
    }

    return (
      <div className="card-body">
        <h5 className="card-title text-light mb-4 text-center">
          <span className="text-rick">
            {writingEpisodes(id).title(character.name, episodes.length)}
          </span>
        </h5>
        <EpisodeList episodes={episodes} />
      </div>
    );
  };

  return (
    <div className="col-lg-4 col-md-4 mb-3">
      <div className={`card ${styles.characterCard}`}>{renderContent()}</div>
    </div>
  );
};

export default EpisodesCard;
