import { useEffect, useState } from "react";

import { getCharacters } from "@services/rickAndMortyApi";

import { getPageFromUrl } from "utilities/helpers";

import { CharactersEnum } from "types/enums";
import { Character, Info } from "types/rickAndMortyTypes";

const PAGE_URL = "https://rickandmortyapi.com/api/character";

export const useCharacter = (id: CharactersEnum) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageUrl, setPageUrl] = useState<string>(`${PAGE_URL}?page=${id}`);
  const [info, setInfo] = useState<Info>({ next: null, prev: null, pages: 1 });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchCharacters = async () => {
      setLoading(true)

      try {
        const { results, info } = await getCharacters(pageUrl);
        setInfo(info)
        setTotalPages(info.pages)
        return setCharacters(results)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar episodios');
        return setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [pageUrl]);

  const handlePrev = () => {
    if (info.prev) setPageUrl(info.prev);
  };

  const handleNext = () => {
    if (info.next) setPageUrl(info.next);
  };

  const currentPage = getPageFromUrl(pageUrl);

  return {
    characters,
    info,
    handlePrev,
    handleNext,
    setPageUrl,
    pageUrl,
    currentPage,
    totalPages,
    loading,
    error,
  };
};
