import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '@organisms/Header';
import Episodes from '@organisms/Episodes';

import { CharacterContext, useCharacterReducer } from 'contexts/CharacterContext';

import Characters from '@organisms/Characters';
import Head from 'next/head';

const Home = () => {
  const characterContext = useCharacterReducer({
    character1: null,
    character2: null,
    character1And2: null,
    setCharacter1: () => null,
    cleanCharacter1: () => null,
    setCharacter2: () => null,
    cleanCharacter2: () => null,
    setCharacter1And2: () => null,
  });

  return (
    <CharacterContext.Provider value={characterContext}>
      <Head>
        <link rel='icon' href='https://rickandmortyapi.com/favicon-32x32.png' />
        <title>Rick and Morty</title>
      </Head>
      <div className='rick-morty-app'>
        <div className='content-area'>
          <Header />
          <div className='container-fluid px-4'>
            <Characters />
            <Episodes />
          </div>
        </div>
      </div>
      <ToastContainer />
    </CharacterContext.Provider>
  );
};

export default Home;
