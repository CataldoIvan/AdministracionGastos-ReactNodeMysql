
import './App.css';
import Navbar from './components/NavBar/Navbar';
import {BrowserRouter,Routes, Route, } from "react-router-dom"
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import ListMov from './components/ListMov/ListMov';
import FormEdit from "./components/FormEdit/FormEdit"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Navbar/>
      

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/ListMovements' element={<ListMov/>} />
                <Route path='/add' element={<Form/>} />
                <Route path='/edit' element={<FormEdit/>} />

            </Routes>
            
            </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
