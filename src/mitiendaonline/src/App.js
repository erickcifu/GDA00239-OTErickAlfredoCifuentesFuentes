import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import OrdenesList from '../src/components/OrdenesList';
// import Login from '../src/pages/login';
import LoginPage from './pages/LoginPage';
import Register from '../src/pages/register';
import Carrito from './pages/carrito';
import FinCompra from './pages/finalizarCompra';
import OrdenesCliente from './pages/ordenesCliente';
import HomeOperador from './pages/homeOp';
import ActualizarCliente from './pages/actualizarCliente';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/actualizarDatos/:idCliente" element={<ActualizarCliente />} />
                    <Route path="/homeOperador" element={<HomeOperador />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/comprar" element={<FinCompra />} />
                    <Route path="/pedidos" element={<OrdenesCliente />} />
                    <Route path="/orden/:idOrden?" element={<OrdenesList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
