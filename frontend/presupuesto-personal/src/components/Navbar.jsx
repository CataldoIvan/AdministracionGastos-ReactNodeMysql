import React from 'react';
import {BrowserRouter,Routes, Route, Link} from "react-router-dom"
import Form from './Form/Form';
import Home from './Home';

const Navbar = () => {
    return (
        <div>
            <BrowserRouter>
                <Link to="/" >Home</Link>
                <Link to="/add" >Agregar</Link>
                <Link to="#" >Logout</Link>
      

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/add' element={<Form/>} />

            </Routes>
            
            </BrowserRouter>
            
        </div>
    );
};

export default Navbar;