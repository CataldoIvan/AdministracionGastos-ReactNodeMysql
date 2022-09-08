import "./Home.css";
import React, { useEffect, useState } from "react";

import CardBalance from "../CardBalance/CardBalance";
import ListMov from "../ListMov/ListMov";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllMovements } from "../../Helpers/helperRequest";
const axios = require("axios");

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  if (isAuthenticated) {
    return (
      <div className="home">
        <CardBalance user={user} />
        <ListMov onHome={true} user={user} />
      </div>
    );
  }
};
export default Home;
