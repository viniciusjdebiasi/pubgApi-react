import React, { useState } from "react";
import { ArrowDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import "./App.css";

import EstatusJogador from "./pubgApi/index";

function App() {
  const [nickname, setNickName] = useState("Tecnosh");
  return (
    <>
      <div className="main">
        <div className="background">
          <div className="container_button">
            <a href="#consultar" className="button_consultar">
              CONSULTAR DADOS DE JOGADOR &nbsp;&nbsp;{" "}
              <ArrowDownIcon className="icons" />{" "}
            </a>
          </div>
        </div>
        <div className="container_consultar" id="consultar">
          <div className="container_consultar_jogadores">
            <input className="input" type="text" maxLength={50} />
            <button className="button_buscar">
              Consultar &nbsp;&nbsp; <MagnifyingGlassIcon className="icons" />
            </button>
          </div>
          <div className="container_consultar_jogadores">
            <EstatusJogador playerName={nickname} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
