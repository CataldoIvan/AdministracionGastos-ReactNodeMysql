import React from "react";
import "./NavBar.css";
import { Link, Route, Router } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
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

        <Link to="/add">
          <Tab label="Agregar" onClick={() => setValue(1)} />
        </Link>

        <Link  to="/ListMovements">
          <Tab onClick={() => setValue(2)} label="Listado de Movimientos" />
        </Link>
        <Link  to="#">
          <Tab  onClick={() => setValue(3)} label="Logout" />
        </Link>
      </Tabs>

     
    </div>
  );
};

export default Navbar;
