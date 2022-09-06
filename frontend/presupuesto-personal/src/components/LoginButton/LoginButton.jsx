import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          boxShadow: 1,
          borderRadius: 2,
          background: "#fff",
          height: 300,
          width: "auto",
          justifyContent: "center",
        
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop:4,
            width: 500,
            textAlign: "auto",
          }}
        >
          <Typography variant="h4" gutterTop>
            Para acceder a la app, es necesario iniciar sesion
          </Typography>
          <Button
            startIcon={<GoogleIcon />}
            variant="contained"
            color="primary"
            onClick={() => loginWithRedirect()}
            sx={{
              height: 50,
              width: "80%",
              margin: "auto",
            }}
          >
            Log In
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default LoginButton;
