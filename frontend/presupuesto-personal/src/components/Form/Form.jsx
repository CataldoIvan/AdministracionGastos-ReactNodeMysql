import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth0 } from "@auth0/auth0-react";
import { helpRequest } from "../../Helpers/helperRequest";
import swal from 'sweetalert';
import LoginButton from "../LoginButton/LoginButton";


const currencies = [
  {
    value: "output",
    label: "Output",
  },
  {
    value: "entry",
    label: "Entry",
  },
];

const Form = () => {
  const { isAuthenticated, user,isLoading } = useAuth0();
  const [newMov, setNewMov] = useState({
    concept: null,
    amount: null,
    date: dayjs().toISOString(),
    type: "output",
    userName:user?.name,
    userEmail:user?.email
  });
  let navigate = useNavigate();


  const handleChange = (e, pickDate = false) => {

    if (pickDate) {
      let dateTaxReg=new RegExp(/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/)
      
      if(dateTaxReg.test(("00"+e.$D).slice(-2)+"/"+("00"+e.$M).slice(-2)+"/"+("0000"+e.$y).slice(-4))){
        setNewMov({ ...newMov, date: e.toISOString() });
      }
      
    } else {
      setNewMov({ ...newMov, [e.target.name]: e.target.value });
    }
    //
  };

  const handleClick =  (e) => {
    e.preventDefault();
    
   helpRequest().addNewMovement(newMov).then(res=>{

     if (res.status == 200) {
      
       navigate("/");
     } else if(res.error){
      
      swal("No se pudo crear", res.statusText, "error");
    
     }
   })
    
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <LoginButton />;
  }
  
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
          /* minLength="5" */
          autoComplete=""
          onChange={handleChange}
          name="concept"
          required
        />

        <LocalizationProvider select dateAdapter={AdapterDayjs}>
          <Stack id="pickerDate" select>
            <DesktopDatePicker
            required
            
              label="Date"
              name="date"
              inputFormat="DD/MM/YYYY"
              value={newMov.date}
              onChange={(e) => {
                handleChange(e, true);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <TextField
        required
          id="outlined-number"
          label="Import"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
          label="Expense Type"
          /* value={currency} */
          /* onChange={handleChange} */
          SelectProps={{
            native: true,
          }}
          onChange={handleChange}
          name="type"
          variant="filled"
          required
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
          
          handleClick(e);
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default Form;
