import React, { useEffect, useState } from "react";
import { ListBulletIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import "./style.css";

function EstatusJogador({ playerName }) {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clanDetails, setClanDetails] = useState(null);
  const [playerPartidaDetails, setPlayerPartidaDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjMTliNTVlMC01Yzg2LTAxM2QtYmVmNS0xNjVmNmJlZjNhYmMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzI3MTcwNzQyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InN0YXR1cy1qb2dhZG9yIn0.J3e5AS60OB0mMHFdu6z_x6wcYWOgRQPN1XiwJAo-ehs";

    // OBTER DADOS DO JOGADOR
    fetch(
      `https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/vnd.api+json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(`Erro: ${errData.errors[0].title}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setPlayerStats(data);
        setLoading(false);

        // OBTER DADOS DA PARTIDA
        const idMatch = "f74b7b39-b3db-446b-80be-b4858c18a962";
        fetch(
          `https://api.pubg.com/shards/steam/matches?filter[id]=${idMatch}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: "application/vnd.api+json",
            },
          }
        );

        // RECEBER E GUARDAR INFORMAÇÕES DO CLAN
        const clanId = data.data[0].attributes.clanId;

        fetch(`https://api.pubg.com/shards/steam/clans/${clanId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/vnd.api+json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errData) => {
                throw new Error(`Erro no clã: ${errData.errors[0].title}`);
              });
            }
            return response.json();
          })
          .then((clanData) => {
            setClanDetails(clanData);
          });
      })
      .catch((error) => {
        console.error("Erro capturado:", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, [playerName]);

  if (loading) {
    return <p>Carregando dados do jogador...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="main">
      <div className="jogador_clan">
        <div className="info_jogador">
          <p className="titulo_infos">Detalhes do Jogador</p>
          {playerStats && playerStats.data && playerStats.data.length > 0 ? (
            <>
              {playerStats.data[0].attributes.name}
              Plataforme: {playerStats.data[0].attributes.shardId}
            </>
          ) : (
            <p>Jogador não encontrado ou sem dados disponíveis.</p>
          )}
        </div>

        <div className="info_clan">
          <p className="titulo_infos">Detalhes do Clãn</p>
          {clanDetails ? (
            <>
              <p>Nome do clã: {clanDetails.data.attributes.clanName}</p>
              <p>Tag do clã: {clanDetails.data.attributes.clanTag}</p>
              <p>Nível do clã: {clanDetails.data.attributes.clanLevel}</p>
              <p>
                Membros no clã: {clanDetails.data.attributes.clanMemberCount}
              </p>
            </>
          ) : (
            <p>Sem clã ou detalhes indisponíveis.</p>
          )}
        </div>
      </div>
      <div className="info_partidas">
        <p className="titulo_infos">Partidas jogadas recentemente</p>

        {playerStats.data[0].relationships.matches.data.map((match, index) => (
          <p key={index} className="text_partida">
            <DoubleArrowRightIcon className="icons_detalhes" />
            &nbsp;&nbsp;Código da partida:&nbsp;
            <strong>{match.id}</strong>
            <button className="button_vermais">
              <ListBulletIcon className="icons_detalhes" />
            </button>
          </p>
        ))}
      </div>
      INFORMAÇÕES PARTIDA COM BASE NO ID da partida:
      9b3cdd91-c6b4-4b30-8428-c6617f13d902 9b3cdd91-c6b4-4b30-8428-c6617f13d902
      9b3cdd91-c6b4-4b30-8428-c6617f13d902 <br />
      <p>
        name <br />
        kills": 1 / assists": 4 / headshotKills": 0 <br />
        longestKill": 54.706352 <br />
        winPlace": 38 <br />
        damageDealt": 23.220001 <br />
        timeSurvived": 152 <br />
        heals": 3 <br />
      </p>
    </div>
  );
}

export default EstatusJogador;
