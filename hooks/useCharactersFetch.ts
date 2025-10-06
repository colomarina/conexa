'use client';
import { useState } from 'react';
import { Character, Info } from '@/types/rickAndMortyTypes';
import { getCharacters } from '@/services/rickAndMorty';
import { toast } from 'react-toastify';

interface UseCharactersFetchProps {
  initialCharacters: Character[];
  initialInfo: Info;
  initialPage: number;
}

export const useCharactersFetch = ({
  initialCharacters,
  initialInfo,
  initialPage,
}: UseCharactersFetchProps) => {
  const [characters, setCharacters] = useState(initialCharacters);
  const [info, setInfo] = useState(initialInfo);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async (page: number) => {
    setLoading(true);
    try {
      const { results, info } = await getCharacters(page);
      setCharacters(results);
      setInfo(info);
      setCurrentPage(page);
    } catch {
      toast.error('Hubo un problema al traer los personajes, intentelo denuevo', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      fetchCharacters(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (info.next && !loading) {
      fetchCharacters(currentPage + 1);
    }
  };

  return {
    characters,
    info,
    currentPage,
    loading,
    handlePrev,
    handleNext,
    isPrevDisabled: currentPage === 1 || loading,
    isNextDisabled: !info.next || loading,
  };
};
