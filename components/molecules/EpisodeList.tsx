import React from "react";

import EpisodeItem from "@atoms/EpisodeItem";

import styles from "@styles/components/molecules/EpisodeList.module.css";

import { EpisodeListType } from "types/components/molecules/EpisodeListType";

const EpisodeList = ({ episodes }: EpisodeListType) => (
  <div className={styles.scrollableList}>
    <div className="list-group list-group-flush overflow-y-auto">
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </div>
  </div>
);

export default EpisodeList;
