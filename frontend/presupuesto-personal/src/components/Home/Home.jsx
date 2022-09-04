import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListMov from "../ListMov/ListMov";
const axios = require("axios");

const array = [
  {
    concept: "comida",
    amount: 1235,
    date: 12 - 20 - 2022,
    type: "ingreso",
  },
  {
    concept: "amigos",
    amount: 200,
    date: 31 - 12 - 2000,
    type: "salida",
  },
  {
    concept: "juego",
    amount: 750,
    date: 31 - 12 - 2100,
    type: "salida",
  },
];
const Home = () => {
  const [balance, setBalance] = useState();
  const [list, setList] = useState(array);

  useEffect(() => {
    const getAllMovement = async () => {
      /* const response=await fetch("http://localhost:3030")
        console.log(response);
         */

      const resBal = await axios.get("http://localhost:3030/balance");
      console.log(resBal.data);
      setBalance(resBal.data);
      const res = await axios.get("http://localhost:3030");
      console.log(res.data);
      setList(res.data);
    };
    getAllMovement();
  }, [balance]);

  return (
    <div className="home">
      <h2>Saldo de la cuenta :${balance && balance}</h2>

      {list ? <ListMov onHome={true}/> : null}
    </div>
  );
};

export default Home;
