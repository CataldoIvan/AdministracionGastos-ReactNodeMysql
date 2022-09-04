import "./Home.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardBalance from "../CardBalance/CardBalance";
import ListMov from "../ListMov/ListMov";
import Navbar from "../NavBar/Navbar";
const axios = require("axios");

const Home = () => {
  const [balance, setBalance] = useState();
  const [list, setList] = useState([]);

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
    
      
      {balance && <CardBalance text={`Saldo de la cuenta :`} balance={balance}/>}
      
      {list ? <ListMov onHome={true}/> : null}
    </div>
  );
};

export default Home;
