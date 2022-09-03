import React from 'react';
import {BrowserRouter,Routes, Route, Link} from "react-router-dom"
import Form from './Form/Form';
import Home from './Home/Home';
import ListMov from './ListMov/ListMov';
import FormEdit from "./FormEdit/FormEdit"
const Navbar = () => {
    return (
        <div>
            <BrowserRouter>
                <Link to="/" >Home</Link><br/>
                <Link to="/add" >Agregar</Link><br/>
                <Link to="/ListMovements" >Listado de Movimientos</Link><br/>
                <Link to="#" >Logout</Link>
      

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/ListMovements' element={<ListMov/>} />
                <Route path='/add' element={<Form/>} />
                <Route path='/edit' element={<FormEdit/>} />

            </Routes>
            
            </BrowserRouter>
            
        </div>
    );
};

export default Navbar;