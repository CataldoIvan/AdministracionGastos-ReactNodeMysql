import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton/LogoutButton";

const Navbar = () => {
  const [value, setValue] = useState(0);
  const { isAuthenticated } = useAuth0();
  useEffect(() => {}, [value]);
  const handleChange = (event, newValue) => {
    setValue(event.target.name);
  };

  return (
    <div className="navbar">
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="scrollable navbar-mui"
        id="navbar"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Link to="/" onClick={() => setValue(0)}>
          <HomeIcon sx={{ fontSize: 40 }} />
          <Tab sx={{ display: { xs: "none", md: "block" } }} label="Home" />
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/ListMovements">
              <ListAltIcon
                sx={{ fontSize: 40, display: { xs: "block", md: "none" } }}
              />
              <Tab
                sx={{ display: { xs: "none", md: "block" } }}
                label="list movement"
                name={1}
                onClick={handleChange}
              />
            </Link>
            <Link to="/add">
              <AddCircleOutlineIcon
                sx={{ fontSize: 40, display: { xs: "block", md: "none" } }}
              />
              <Tab
                sx={{ display: { xs: "none", md: "block" } }}
                label="Add"
                name={2}
                onClick={handleChange}
              />
            </Link>

            <Link to="/profile">
              <PersonIcon
                sx={{ fontSize: 40, display: { xs: "block", md: "none" } }}
              />
              <Tab
                sx={{ display: { xs: "none", md: "block" } }}
                label="Profile"
                name={3}
                onClick={handleChange}
              />
            </Link>
            <LogoutButton />
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Navbar;
