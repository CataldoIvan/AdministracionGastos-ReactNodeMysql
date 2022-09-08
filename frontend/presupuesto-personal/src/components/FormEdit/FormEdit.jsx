import React, { useState } from "react";
import dayjs from "dayjs";
import "./FormEdit.css"
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const axios = require("axios");


const Form = () => {
  const data = useLocation();
  let navigate = useNavigate();
  
  const [movement, setMovement] = useState({
    concept: data.state?.concept || "",
    amount: data.state?.amount || "",
    date: data.state?.date || "",
    type: data.state?.type || "",
  });
 
  const handleChange = (e,pickDate=false) => {
    console.log(e);
    console.log(pickDate);
    if(pickDate){
    setMovement({ ...movement,date: e.toISOString() });
    }else{
      setMovement({ ...movement, [e.target.name]: e.target.value });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(movement);
    const res = await axios.put(`http://localhost:3030/edit/${data.state.id}`, movement);
    console.log(res);
    if(res.status==200){
      navigate("/ListMovements");
   }
  };
  if(!data.state) {return navigate("/ListMovements");}else{    
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
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <Stack id="pickerDate">
              <DesktopDatePicker
                label="Date desktop"
                name="date"
                inputFormat="DD/MM/YYYY"
                value={movement.date}
                onChange={(e)=>{
                  handleChange(e,true)}}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
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
  }
};

export default Form;
