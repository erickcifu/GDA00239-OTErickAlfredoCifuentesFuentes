import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import api from '../config/axios';

const AdminDashboard = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        api.get('/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleInactivar = (id) => {
        api.put(`/usuarios/${id}/inactivar`)
            .then(() => setUsuarios((prev) => prev.filter((user) => user.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.id}>
                            <TableCell>{usuario.nombre}</TableCell>
                            <TableCell>{usuario.correo}</TableCell>
                            <TableCell>{usuario.rol}</TableCell>
                            <TableCell>
                                <Button color="secondary" onClick={() => handleInactivar(usuario.id)}>Inactivar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminDashboard;
