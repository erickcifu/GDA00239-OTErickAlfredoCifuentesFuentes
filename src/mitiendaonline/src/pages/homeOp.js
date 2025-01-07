import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/carrito';
import Layout from '../components/layout';
import api from '../config/axios';

const HomeOperador = () => {
  return (
    <div>
            <Typography variant="h4" gutterBottom>Mis Órdenes</Typography>
    </div>
  );
};


export default HomeOperador;
