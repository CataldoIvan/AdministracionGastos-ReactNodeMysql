import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import FormEdit from "../FormEdit/FormEdit"
import { Link } from "react-router-dom";
const ListMov = () => {

  const [list, setList] = useState([
    /* {
      id: 1,
      concept: "comida",
      amount: 1235,
      date: 12 - 20 - 2022,
      type: "ingreso",
    },
    {
      id: 2,
      concept: "amigos",
      amount: 200,
      date: 31 - 12 - 2000,
      type: "salida",
    },
    {
      id: 3,
      concept: "juego",
      amount: 750,
      date: 31 - 12 - 2100,
      type: "salida",
    }, */
  ]);
  useEffect(() => {
    const getAllMovement = async () => {
      /* const response=await fetch("http://localhost:3030")
            console.log(response);
             */
           
        const res = await axios.get("http://localhost:3030");
          console.log(res.data);
          setList(res.data);
    };
    getAllMovement();
  }, []);

  const handleClick = async(e, id) => {
    e.preventDefault();
    console.log(e);
    console.log(id);
    const res=await axios.delete(`http://localhost:3030/${id}`)
    console.log(res);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          padding="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sizeMedium>Concepto</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((row) => (
              <TableRow
                key={row.id}
                /* sx={{ "&:last-child td, &:last-child th": { border: 1 } }} */
              >
                <TableCell component="th" scope="row" size="medium">
                  {row.concept}
                </TableCell>
                <TableCell align="right">
                  {row.type == "salida" ? "-" : null}${row.amount}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" aria-label="edit">
                        <Link to="/edit" state={row}>
                    <EditIcon  >
                       
                    </EditIcon>
                        </Link>
                  </IconButton>
                  &nbsp;&nbsp;
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      onClick={(e) => {
                        handleClick(e, row.id);
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!list && (
            <caption style={{ textAlign: "center" }}>
              Aun no hay datos cargados
            </caption>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListMov;
