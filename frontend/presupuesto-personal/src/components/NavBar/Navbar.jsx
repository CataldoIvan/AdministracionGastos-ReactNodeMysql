import React from "react";
import "./NavBar.css";
import { Link, Route, Router } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton/LogoutButton";
const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const { isAuthenticated } = useAuth0();

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(event.target.value);
  };
  return (
    <div className="navbar">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Link to="/" onClick={() => setValue(0)}>
          <Tab label="Home" />
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/ListMovements">
              <Tab label="list movement" value="1" onClick={handleChange} />
            </Link>
            <Link to="/add" >
              <Tab label="Add" onClick={() => setValue(2)} />
            </Link>


            <Link to="/profile">
              <Tab label="Profile" onClick={() => setValue(3)} />
            </Link>
            <LogoutButton />
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Navbar;
