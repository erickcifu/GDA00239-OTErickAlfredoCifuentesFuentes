import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import OrdenesList from '../src/components/OrdenesList';
import Login from '../src/pages/login';
import Register from '../src/pages/register';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/orden/:idOrden?" element={<OrdenesList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
