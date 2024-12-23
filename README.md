# Proyecto Node.js y Express
Actualmente el proyecto contiene el backend del proyecto, para la gestión de usuarios, productos, categorias, estados, y ordenes. 
En este apartado se incluyen los endpoints y la información para poder realizar las pruebas correspondientes.

## Tecnologías utilizadas
- Node.js
- Express
- SQL Server
  
## Configuración del entorno
### Requisitos
- Tener instalado Node.js v18.17.1
- Tener instalado SQL Server y el gestor

### Instalación
- Clonar el repositorio: https://github.com/erickcifu/GDA00239-OTErickAlfredoCifuentesFuentes.git
- Instalar dependencias: **npm install**
- Realizar las configuraciones de conexión hacia la base de datos:
  - Desde el servidor en el gestor de base de datos, buscar la carpeta **security**, dentro de la carpeta dar clic izquierdo sobre la carpeta **login** y seleccionar la opción **New Login**
  ![alt text](image-2.png)

    Las configuraciones son las siguientes:

    1. Utilizar el user que está en el archivo .env
    2. Seleccionar la opción **SQL Server authentication*
    3. Escribir la contraseña definida en el archivo .env
    4. Desmarcar las opciones: 
       - Enforce password policy
       - Enforce password expiration
       - User must change password at next login
    5. Seleccionar la base de datos del proyecto
   
    ![alt text](image-3.png)

  - Dentro de la misma ventana, en la opción **Server Roles** se deben seleccionar los siguientes roles para el usuario:
  
    ![alt text](image-6.png)

  - La opción **User Mapping** se debe ver de la siguiente manera:
    ![alt text](image-7.png)

  - En la herramienta **SQL Server Configuration Manager** asegurarse que el protocolo TCP/IP esté habilitado.
  
    ![alt text](image-8.png)
  - Asegurarse que el servicio **SQL Server** esté en estado **Running**
  
    ![alt text](image-9.png)

- Iniciar el servidor: **npm run dev**


## Entpoints disponibles
### Usuarios
Para poder acceder a las funcionalidades, es necesario tener un usuario.
![alt text](image-5.png)

#### Registro
- **POST http://localhost:3000/registro**: Crear un nuevo usuario.
  
  #### Petición:
        {
        "rol_idrol": 1,
        "estados_idestado": 1,
        "correoUsuaro": "admin@example.com",
        "nombreCompletoUsuario": "John Doe",
        "passwordUsuario": "123456",
        "telefonoUsuario": "1234567890",
        "fechaNacimientoUsuario": "1990-01-01",
        "Clientes_idClientes": 1
        }

#### Inicio de sesión
- **POST http://localhost:3000/login**: Inicia sesión con un usuario.
  
  #### Petición:
        {
            "correoUsuaro": "admin@example.com",
            "passwordUsuario": "123456"
        }

  #### Respuesta exitosa
  Si el usuario y contraseña son correctos, deberá recibir un token con duración de 24 hrs. El cual deberá copiar y pegarlo en los heades de los siguientes endpoints.

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW9zIjo1LCJyb2xfaWRSb2wiOjEsImVzdGFkb3NfaWRlc3RhZG8iOjEsImNvcnJlb1VzdWFybyI6ImFkbWluQGV4YW1wbGUuY29tIiwibm9tYnJlQ29tcGxldG9Vc3VhcmlvIjoiSm9obiBEb2UiLCJwYXNzd29yZFVzdWFyaW8iOiIkMmEkMTAkNm9VNzJmTGgxNjM0a3Bpb1hheG9zLk9yd1RwdkduL1Bpd3VjWkpUVGpjcTM0QW5mOHpxQ1ciLCJ0ZWxlZm9ub1VzdWFyaW8iOiIxMjM0NTY3ODkwIiwiZmVjaGFOYWNpbWllbnRvVXN1YXJpbyI6IjE5OTAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImZlY2hhQ3JlYWNpb24iOiIyMDI0LTEyLTIyVDE3OjI1OjUxLjM4N1oiLCJDbGllbnRlc19pZENsaWVudGVzIjoxLCJpYXQiOjE3MzQ5MzE5MTcsImV4cCI6MTczNTAxODMxN30.88G6R3_kw7mdXODT1upPF6slax6oP6lXTjvqaipHh-w"
        }

**NOTA:** Para los endpoint siguientes se necesita agregar el token recibido en el proceso de login dentro de los headers. e.g:

![alt text](image.png)

#### Obtener usuarios por ID
- **GET http://localhost:3000/usuarios/{id}**: Obtener un usuario por su id.
  

#### Actualizar usuario
- **PUT http://localhost:3000/usuarios/{id}**: Actualizar un usuario.
  
  #### Petición:
        {
        "idUsuarios": 4,
        "rol_idrol": 1,
        "estados_idestado": 1,
        "correoUsuaro": "actualizacion@example.com",
        "nombreCompletoUsuario": "Usuario actualizado",
        "passwordUsuario": "123456",
        "telefonoUsuario": "1234567890",
        "fechaNacimientoUsuario": "1990-01-01",
        "Clientes_idClientes": 1
        }

#### Eliminar usuario
- **DELETE http://localhost:3000/usuarios/:{id}**: Eliminar un usuario.

    #### Petición:
        {
            "estados_idestado": 1
        }

### Productos 
***
#### Obtener producto
- **GET http://localhost:3000/productos/{id}**: Obtener un producto por su id.
  
#### Insertar producto
- **POST http://localhost:3000/productos**: Insertar un producto.

    #### Petición:
        {
            "CategoriaProductos_idCategoriaProducto":1,
            "usuarios_idusuarios":5, 
            "nombreProducto": "Prueba postman", 
            "marcaProducto": "Prueba postman",
            "descripcion": "Prueba postman",
            "codigoProducto": "5780000",
            "stockProducto":10,
            "precioProducto":12.50,
            "fotoProducto":null,
            "estados_idestado":1
        }
    
#### Actualizar producto
- **PUT http://localhost:3000/productos/{id}**: Actualizar un producto.

    #### Petición:
        {
            "idProducto": 1003,
            "CategoriaProductos_idCategoriaProducto":1,
            "usuarios_idusuarios":5, 
            "nombreProducto": "Actualizado", 
            "marcaProducto": "Prueba postman",
            "descripcion": "Prueba postman",
            "codigoProducto": "8456201",
            "stockProducto":10,
            "precioProducto":12.50,
            "fotoProducto":null,
            "estados_idestado":1
        }

#### Inactivar producto
- **DELETE http://localhost:3000/productos/{id}**: Inactivar un producto

    #### Petición:
            {
                "estados_idestado": 2
            }

### Clientes
***

#### Obtener clientes por Id
- **GET http://localhost:3000/clientes/{id}**: Obtener un cliente por id.

#### Crear cliente
- **POST http://localhost:3000/clientes**: Crear un cliente.
  
  #### Petición:
        {
            "razon_social": "Ejemplo razon social",
            "nombreComercial": "John Doe",
            "Nit": "12345-9",
            "direccionEntrega": "Guatemala, guatemala",
            "telefonoCliente": "00000000",
            "emailCliente": "cliente@cliente.com"
        }

#### Actualizar cliente
- **PUT http://localhost:3000/clientes/{id}**: Actualizar un cliente.
  
  #### Petición:
        {
            "idCliente": 2,
            "razon_social": "Ejemplo razon social",
            "nombreComercial": "Erick Cifuentes",
            "Nit": "12345-9",
            "direccionEntrega": "Ciudad",
            "telefonoCliente": "45789535",
            "emailCliente": "cliente@cliente.com"
        }

### Categoría de productos
***

#### Obtener categorías de productos
- **GET http://localhost:3000/categoria/{id}**: Obtener categoría por id.
  
#### Crear categoría
- **POST http://localhost:3000/categoria**: Crear categoría.
  
  #### Petición
        {
            "usuarios_idusuarios": 5,
            "nombreProducto": "ejemplo",
            "estados_idestado": 1
        }

#### Actualizar categoría
- **PUT http://localhost:3000/categoria/{id}**: Actualizar categoría.

    #### Petición: 
        {
            "idCategoriaProducto": 1,
            "usuarios_idusuarios": 5,
            "nombreProducto": "Ejemplo",
            "estados_idestado": 1
        }

#### Desactivar categoría
- **DELETE http://localhost:3000/categoria/{id}**: Desactivar categoría.

    #### Petición:
        {
            "estados_idestado": 2
        }

### Rol de usuarios
***

#### Obtener rol
- **GET http://localhost:3000/rol/{id}**: Obtener rol por id.

#### Crear rol
- **POST http://localhost:3000/rol**: Crear rol.

    #### Petición:
        {
            "nombreRol": "Cliente"
        }

#### Actualizar rol
- **PUT http://localhost:3000/rol/{id}**: Actualizar rol.

    #### Petición:
        {
            "idRol": 1,
            "nombreRol": "Actualizado"
        }

### Estado de las tablas
***

### Obtener estados
- **GET http://localhost:3000/estado/{id}**: Obtener estados por id.
  
#### Crear estado
- **POST http://localhost:3000/estado**: Crear estado.
  
  #### Petición:
        {
            "nombre": "Activo"
        }

#### Actualizar estado
- **PUT http://localhost:3000/estado/{id}**: Actualizar estado.
  
  #### Petición:
        {
            "idestado": 1,
            "nombre": "Actualizado"
        }

### Ordenes
***
Las ordenes y los detalles de orden se manejan en conjunto.

#### Obtener orden completa
- **GET http://localhost:3000/orden/{id}**: Obtener orden completa por id.

    #### Respuesta:
        {
            "message": "Orden encontrada",
            "orden": {
                "idOrden": 4,
                "usuarios_idusuarios": 4,
                "nombreCompletoOrden": "Orden de pruebas postman",
                "direccionOrden": "Guatemala, guatemala",
                "telefonoOrden": "00000000",
                "correoOrden": "ejemplo@gmail.com",
                "fecha_entrega": "2024-12-24T00:00:00.000Z",
                "total_orden": 25
            },
            "detalles": [
                {
                    "Orden_idOrden": 4,
                    "Productos_idProductos": 3,
                    "cantidadOD": 1,
                    "precioOD": 12.5,
                    "subtotalOD": 12.5
                },
                {
                    "Orden_idOrden": 4,
                    "Productos_idProductos": 1003,
                    "cantidadOD": 1,
                    "precioOD": 12.5,
                    "subtotalOD": 12.5
                }
            ]
        }
#### Crear orden
- **POST http://localhost:3000/orden**: Crear orden.

    #### Petición:
        {
            "usuarios_idusuarios": 5,
            "nombreCompletoOrden": "Orden de productos", 
            "direccionOrden": "Ciudad de guatemala", 
            "telefonoOrden": "85467986",
            "correoOrden": "usuario@gmail.com", 
            "fecha_entrega": "2024-12-24", 
            "detalles": [{
                "productos_idproductos": 3,
                "cantidad": 1,
                "precio": 12.5,
                "subtotal": 12.5
            }
          ]
        }
    
    #### Respuesta:
        {
            "message": "Orden creada exitosamente",
            "data": {
                "idOrden": 1002,
                "usuarios_idusuarios": 5,
                "estados_idestado": 1,
                "fecha_creacion": "2024-12-23T00:44:53.430Z",
                "nombreCompletoOrden": "Orden de productos",
                "direccionOrden": "Ciudad de guatemala",
                "telefonoOrden": "85467986",
                "correoOrden": "usuario@gmail.com",
                "fecha_entrega": "2024-12-24T00:00:00.000Z",
                "total_orden": 12.5
            }
        }

#### Actualizar orden
- **PUT http://localhost:3000/orden/{id}**: Actualizar orden.
  
  #### Petición:
        {
            "usuarios_idusuarios": 4,
            "nombreCompletoOrden": "Orden de pruebas", 
            "direccionOrden": "Ciudad", 
            "telefonoOrden": "12345678",
            "correoOrden": "correousuario@gmail.com", 
            "fecha_entrega": "2024-12-24", 
            "detalles": [{
                "productos_idproductos": 3,
                "cantidad": 1,
                "precio": 12.5,
                "subtotal": 12.5
            },
            {
                "productos_idproductos": 1003,
                "cantidad": 1,
                "precio": 12.5,
                "subtotal": 12.5
            }
          ]
        }

    #### Respuesta:
        {
            "message": "Orden actualizada exitosamente",
            "data": {
                "idOrden": 4,
                "usuarios_idusuarios": 4,
                "estados_idestado": 1,
                "fecha_creacion": "2024-12-22T19:35:21.147Z",
                "nombreCompletoOrden": "Orden de pruebas",
                "direccionOrden": "Ciudad",
                "telefonoOrden": "12345678",
                "correoOrden": "correousuario@gmail.com",
                "fecha_entrega": "2024-12-24T00:00:00.000Z",
                "total_orden": 25
            }
        }

#### Desactivar orden
- **DELETE http://localhost:3000/orden/{id}**: Desactivar orden.

    #### Petición:
        {
            "estados_idestado": 2
        }
