import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Divider, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import { Link, useNavigate } from 'react-router-dom';
import api, {obtenerCliente} from '../config/axios'; 

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openToken, setOpenToken] = useState(false);
    const idCliente = localStorage.getItem('Clientes_idClientes');; 
    const navigate = useNavigate(); 

    console.log("El idCliente es:", idCliente);
    const cerrarSesion = () => {
        setOpenToken(true);
        localStorage.removeItem('token'); 
        setTimeout(() => {
            navigate('/');
        }, 2000); 
    };

    
    const toggleDrawer = () => {
        setOpen(!open);
      };
    
      return (
        <div>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ display: { xs: 'block', md: 'none' } }}  
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Mi Tienda Online
              </Typography>
              <div sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color="inherit" component={Link} to="/home">Home</Button>
                <Button color="inherit" component={Link} to="/pedidos">Pedidos</Button>
                <Button color="inherit" component={Link} to={`/actualizarDatos/${idCliente}`}>Actualizar Datos</Button>
                <Button color="inherit" onClick={cerrarSesion} component={Link} to="/">Cerrar Sesión</Button>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
          >
            <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
              <List>
                <ListItem button component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/pedidos">
                  <ListItemText primary="Pedidos" />
                </ListItem>
                <ListItem button component={Link} to={`/actualizarDatos/${idCliente || ''}`}>
                  <ListItemText primary="Actualizar Datos" />
                </ListItem>
                <ListItem onClick={cerrarSesion} button component={Link} to="/">
                  <ListItemText  primary="Cerrar Sesión" />
                </ListItem>
              </List>
              <Divider />
            </div>
          </Drawer>

            {openToken && (
                <Alert severity="info" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1300 }}>
                Cierre de sesión exitoso. Redirigiendo al inicio...
                </Alert>
            )}
        </div>
      );
};

export default Navbar;
