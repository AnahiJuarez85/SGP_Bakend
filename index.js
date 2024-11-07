const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routers/usuarios');
const projectsRoutes = require('./routers/proyectos');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;


app.use('/api/usuarios', usersRoutes);
app.use('/api/proyectos', projectsRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de SGP en funcionamiento');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
