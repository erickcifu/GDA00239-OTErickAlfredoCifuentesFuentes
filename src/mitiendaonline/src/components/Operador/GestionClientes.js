import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../services/axiosInstance';

const GestionClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        api.get('/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        api.delete(`/clientes/${id}`)
            .then(() => setClientes(clientes.filter(cliente => cliente.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Gestionar Clientes</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>nombreComercial</TableCell>
                            <TableCell>razon_social</TableCell>
                            <TableCell>emailCliente</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.map(cliente => (
                            <TableRow key={cliente.id}>
                                <TableCell>{cliente.nombreComercial}</TableCell>
                                <TableCell>{cliente.razon_social}</TableCell>
                                <TableCell>{cliente.emailCliente}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(cliente.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GestionClientes;
