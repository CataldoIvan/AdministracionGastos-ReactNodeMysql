import React from "react";
import "./CardBalance.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, ThemeProvider, createTheme } from '@mui/system';
import LoginButton from "../LoginButton/LoginButton";

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
   
  },
});

const CardBalance = ({ text,balance }) => {
  return (
    <div className="balance">
    

      <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          
        }}
      >
        <Box sx={{ color: 'text.secondary',fontSize: 24 }}>{text}</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'bold' }}>
          {balance}
        </Box>
       
      </Box>
    </ThemeProvider>

    <LoginButton/>
    </div>
  );
};

export default CardBalance;
