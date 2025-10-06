import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '@/organisms/Header';
import Characters from '@/organisms/Characters';
import Episodes from '@/organisms/Episodes';
import CharacterProvider from '@/contexts/CharacterContext';

export default async function Home() {
  return (
    <CharacterProvider>
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
    </CharacterProvider>
  );
}
