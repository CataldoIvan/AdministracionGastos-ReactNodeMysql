import React, { useEffect, useState } from "react";
import "./ListMov.css";
import { Alert, IconButton } from "@mui/material";
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
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { helpRequest } from "../../Helpers/helperRequest";

import { useAuth0 } from "@auth0/auth0-react";
/* SELECt DISTINCT `concept` FROM`movements` */

const ListMov = ({ onHome }) => {
  const [list, setList] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterConcept, setFilterConcept] = useState([]);
  const listOnHome = onHome || false;
  const { isAuthenticated, user } = useAuth0();
  let navigate = useNavigate();

  useEffect(() => {
    helpRequest()
      .getAllMovements(user.email, filterType)
      .then((res) => {
        !res.error ? (
          <>{(setList(res), listOfCategory(res))}</>
        ) : (
          <>{console.log(res.statusText), alert(res.statusText)}</>
        );
      });
  }, [filterType]);

  

  const listOfCategory = (list) => {
    const result = list.reduce((acc, item) => {
      if (!acc.includes(item.concept)) {
        acc.push(item.concept);
      }
      console.log(acc);
      return acc;
    }, []);
    
    setFilterConcept(result);
   
  };
  const handleChange = async (event) => {
    
    setFilterType(event.target);
    
  };

  //delete Movement
  const handleClick = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete(`http://localhost:3030/${id}`);
    console.log(res);
    // getAllMovement();
  };
  if (!isAuthenticated) {
    return navigate("/");
  }
  return (
    <div className="listmov">
      <div className="filters">
        {!listOnHome && (
          <Box sx={{ mr: 1, minWidth: 160 }}>
            <FormControl className="select-filter" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filtrar por Concepto:
              </InputLabel>
              <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterType.value}
                label="Age"
                name="concept"
                onChange={handleChange}
              >
                <MenuItem selected name="concept" value="todos">
                  Todos
                </MenuItem>

                {filterConcept?.map((conceptItem, index) => {
                  return (
                    <MenuItem key={index} name="concept" value={conceptItem}>
                      {conceptItem}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )}

        {!listOnHome && (
          <Box sx={{ mr: 1, mb: 1, minWidth: 150 }}>
            <FormControl className="select-filter" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filtrar por:
              </InputLabel>
              <Select
                autoWidth
                name="type"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterType.value}
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
      </div>
      <TableContainer component={Paper}>
        <Table
          /* sx={{ minWidth: 650 }} */
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
                  {new Date(row.date).toLocaleDateString("en-GB").slice(0, 10)}
                </TableCell>
                <TableCell component="th" scope="row" size="medium">
                  {row.concept}
                </TableCell>
                <TableCell align="right">${row.amount}</TableCell>
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
          {list.length == 0 ? (
            <caption style={{ textAlign: "center" }}>
              Aun no hay datos cargados
            </caption>
          ) : null}
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListMov;
