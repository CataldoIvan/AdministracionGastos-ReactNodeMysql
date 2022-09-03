import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
const axios = require("axios");

const currencies = [
  {
    value: "salidas",
    label: "Salidas",
  },
  {
    value: "ingreso",
    label: "Ingreso",
  },
];
const Form = () => {
  const data = useLocation();

  const [movement, setMovement] = useState({
    concept: data.state.concept,
    amount: data.state.amount,
    date: data.state.date,
    type: data.state.type,
  });

  const handleChange = (e) => {
    setMovement({ ...movement, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(movement);
    const res = await axios.put(`http://localhost:3030/edit/${data.state.id}`, movement);
    console.log(res);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
     {console.log(data)}
      <div>
        <TextField
          id="outlined-password-input"
          label="concept"
          type="text"
          autoComplete=""
          onChange={handleChange}
          name="concept"
          defaultValue={movement.concept}
        />
        <TextField
          id="outlined-read-only-input"
          label="Fecha"
          type="text"
         
          name="date"
          onChange={handleChange}
          defaultValue={movement.date}
        />
        <TextField
          id="outlined-number"
          label="amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          name="amount"
          onChange={handleChange}
          defaultValue={movement.amount}
        />
        <TextField
          id="filled-select-currency-native"
          label="Tipo de Gasto"
          SelectProps={{
            native: true,
          }}
          onChange={handleChange}
          name="type"
          variant="filled"
          disabled
          value={movement.type}
        ></TextField>
      </div>
      <Button
        variant="contained"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Confirmar
      </Button>
    </Box>
  );
};

export default Form;
