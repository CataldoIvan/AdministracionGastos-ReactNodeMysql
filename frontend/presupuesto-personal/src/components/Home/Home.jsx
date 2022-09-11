import "./Home.css";
import React, { useEffect, useState } from "react";

import CardBalance from "../CardBalance/CardBalance";
import ListMov from "../ListMov/ListMov";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllMovements } from "../../Helpers/helperRequest";
import { Grid } from "@mui/material";
const axios = require("axios");

const Home = () => {
  const { isAuthenticated, user,isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <LoginButton />;
  }

  if (isAuthenticated) {
    return (
      <Grid container className="home">
        <CardBalance xs={12} user={user} />
        <ListMov xs={12}  onHome={true} user={user} />
      </Grid>
    );
  }
};
export default Home;
