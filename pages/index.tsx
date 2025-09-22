import React from "react";
import { ToastContainer } from "react-toastify";

import Header from "@organisms/Header";
import Episodes from "@organisms/Episodes";

import {
  CharacterContext,
  useCharacterReducer,
} from "contexts/CharacterContext";

import Characters from "@organisms/Characters";

const Home = () => {
  const characterContext = useCharacterReducer({
    character1: null,
    character2: null,
    character1And2: null,
    setCharacter1: () => null,
    cleanCharacter1: () => null,
    setCharacter2: () => null,
    cleanCharacter2: () => null,
    setCharacter1And2: () => null
  });

  return (
    <CharacterContext.Provider value={characterContext}>
      <div className="rick-morty-app">
        <div className="content-area">
          <Header />
          <div className="container-fluid px-4">
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
