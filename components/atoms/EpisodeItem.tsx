import React from "react";

import { EpisodeItemType } from "types/components/atoms/EpisodeItemType";

import { formatDateToSpanish } from "utilities/helpers";

const EpisodeItem = ({ episode }: EpisodeItemType) => (
  <div className="list-group-item bg-transparent text-light border-secondary">
    <strong>{episode.name}</strong> -{" "}
    <em>{formatDateToSpanish(episode.air_date)}</em>
  </div>
);

export default EpisodeItem;
