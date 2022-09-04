import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
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
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
/* SELECt DISTINCT `concept` FROM`movements` */
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
const ListMov = ({ onHome }) => {
  const [list, setList] = useState([]);
  const [filterType, setFilterType] = useState("todos");
  const [filterConcept, setFilterConcept] = useState([]);
  const listOnHome = onHome || false;
 
  useEffect(() => {
    getAllMovement()
    
    
  }, [filterType]);

  const getAllMovement = async () => {
    /* const response=await fetch("http://localhost:3030")
          console.log(response);
           */
    
    const res = await axios.get("http://localhost:3030", {
      params: { listFor: filterType },
    });
    console.log(res.data);
    setList(res.data);
    listOfCategory(res.data)
   
  };

  const listOfCategory = (list) => {
    const result = list.reduce((acc,item)=>{
      if(!acc.includes(item.concept)){
        acc.push(item.concept);
      }
      console.log(acc);
      return acc;
    },[])
    console.log(result);
    setFilterConcept(result);
    if (list) {
    }
  };
  const handleChange = async (event) => {
    //console.log(event.target.value);
    setFilterType(event.target.value);
    /*  const res = await axios.get("http://localhost:3030",{params:{listFor:filterType}});
      console.log(res);
      setList(res.data); */
  };

  //delete Movement
  const handleClick = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete(`http://localhost:3030/${id}`);
    console.log(res);
    getAllMovement();
  };

  return (
    <div>
     
        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Filtrar por Concepto:</InputLabel>
            <Select
              autoWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterType}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem   value={"todos"} disabled>Todos</MenuItem>
             
              {filterConcept?.map((conceptItem,index)=>{
                return <MenuItem key={index} value={conceptItem}>{conceptItem}</MenuItem>

              })}
             
            </Select>
          </FormControl>
        </Box>
      
      {!listOnHome && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Filtrar por:</InputLabel>
            <Select
              autoWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterType}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"todos"}>Todos</MenuItem>
              <MenuItem value={"ingreso"}>Ingreso</MenuItem>
              <MenuItem value={"salida"}>Salida</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          padding="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Concepto</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="right">Tipo</TableCell>
              {!listOnHome && <TableCell align="right">Accion</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((row) => (
              <TableRow
                key={row.id}
                /* sx={{ "&:last-child td, &:last-child th": { border: 1 } }} */
              >
                <TableCell component="th" scope="row" size="medium">
                  {row.date}
                </TableCell>
                <TableCell component="th" scope="row" size="medium">
                  {row.concept}
                </TableCell>
                <TableCell align="right">
                  {row.type === "salida" ? "-" : null}${row.amount}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                {!listOnHome && (
                  <TableCell align="right">
                    <IconButton edge="end" aria-label="edit">
                      <Link to="/edit" state={row}>
                        <EditIcon></EditIcon>
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
                )}
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