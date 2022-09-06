import React from "react";
import "./CardBalance.css";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { Box, ThemeProvider, createTheme } from "@mui/system";

import {  useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
  },
});

const CardBalance = ({ text, balance }) => {
  let navigate = useNavigate();
  return (
    <div className="balance">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
          }}
        >
          <Box sx={{ color: "text.secondary", fontSize: 24 }}>{text}</Box>
          <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "bold" }}>
            {balance}
          </Box>
        </Box>
      </ThemeProvider>
      
        <Button
          sx={{ background:"rgb(0, 127, 255)",mt:2}}
          startIcon={<Add />}
          onClick={() => {
            navigate("/add")
          }}
          
        >
          Agregar un nuevo registro
        </Button>
      
     
      
    </div>
  );
};

export default CardBalance;
