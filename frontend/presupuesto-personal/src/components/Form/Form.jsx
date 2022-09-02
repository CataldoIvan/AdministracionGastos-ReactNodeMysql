import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
  const [newMov, setNewMov] = useState({
    concept: null,
    amount: null,
    date: null,
    type: "salida",
  });

  const handleChange=(e)=>{
    
    setNewMov({...newMov,[e.target.name]:e.target.value})
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(newMov);
    const res=await axios.post("http://localhost:3030",newMov)
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
      <div>
        <TextField
          id="outlined-password-input"
          label="concept"
          type="text"
          autoComplete=""
          onChange={handleChange}
          name="concept"
        />
        <TextField
          id="outlined-read-only-input"
          label="Fecha"
          type="text"
          /* defaultValue="" */
          name="date"
          onChange={handleChange}
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
        />
        <TextField
          id="filled-select-currency-native"
          select
          label="Tipo de Gasto"
          /* value={currency} */
          /* onChange={handleChange} */
          SelectProps={{
            native: true,
          }}
          onChange={handleChange}
          name="type"
          variant="filled"
          defaultValue={"Salida"}
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
      <Button
        variant="contained"
        onClick={(e) => {
          console.log(e);
          handleClick(e);
        }}
      >
        Crear
      </Button>
      
    </Box>
  );
};

export default Form;
