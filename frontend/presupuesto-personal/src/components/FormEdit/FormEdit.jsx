import React, { useState } from "react";
import dayjs from "dayjs";
import "./FormEdit.css";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { helpRequest } from "../../Helpers/helperRequest";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";

const axios = require("axios");

const Form = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const data = useLocation();
  let navigate = useNavigate();
  

  const [movement, setMovement] = useState({
    concept: data.state?.concept || "",
    amount: data.state?.amount || "",
    date: data.state?.date || "",
    type: data.state?.type || "",
  });

  const handleChange = (e, pickDate = false) => {
    if (pickDate) {
      let dateTaxReg=new RegExp(/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/)
      
      if(dateTaxReg.test(("00"+e.$D).slice(-2)+"/"+("00"+e.$M).slice(-2)+"/"+("0000"+e.$y).slice(-4))){
       
        setMovement({ ...movement, date: e.toISOString() });
        
      }
    } else {
      setMovement({ ...movement, [e.target.name]: e.target.value });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    helpRequest()
      .editMovement(data.state.id, movement)
      .then((res) => {
        

        if (res.status == 200) {
          navigate("/ListMovements");
        } else if (res.error) {
          
          swal("No se pudo editar", res.statusText, "error");
        }
      });
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <LoginButton />;
  }
  if (!data.state) {
    return navigate("/ListMovements");
  } else {
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
            defaultValue={movement.concept}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack id="pickerDate">
              <DesktopDatePicker
                label="Date"
                name="date"
                inputFormat="DD/MM/YYYY"
                value={movement.date}
                onChange={(e) => {
                  handleChange(e, true);
                }}
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
            label="Expense Type"
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
          Confirm edit
        </Button>
      </Box>
    );
  }
};

export default Form;
