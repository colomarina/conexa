import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

export const getCharacters = (pageUrl: string) =>
  axios
    .get(pageUrl)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

export const getEpisodes = (episodes: number[]) =>
  axios
    .get(`${API_URL}/episode/${episodes}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

