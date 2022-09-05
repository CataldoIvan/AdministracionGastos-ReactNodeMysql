import "./Home.css"
import React, { useEffect, useState } from "react";

import CardBalance from "../CardBalance/CardBalance";
import ListMov from "../ListMov/ListMov";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
const axios = require("axios");

const Home = () => {
  const [balance, setBalance] = useState();
  const [list, setList] = useState([]);
  const { isAuthenticated ,loginWithRedirect} = useAuth0();

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
if(!isAuthenticated){ return <LoginButton/>}

if(isAuthenticated){ 
  return (
    <div className="home">
 
      
      {balance && <CardBalance text={`Saldo de la cuenta :`} balance={balance}/>}
      
      {list ? <ListMov onHome={true}/> : null}
    </div>
  );
};
}
export default Home;
