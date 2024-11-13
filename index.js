const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routers/usuarios');
const projectsRoutes = require('./routers/proyectos');
const tetsPlansRoutes = require('./routers/testPlans');
const tetsCasesRoutes = require('./routers/testCases');
const defectsRoutes = require('./routers/defects');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;


app.use('/api/usuarios', usersRoutes);
app.use('/api/proyectos', projectsRoutes);
app.use('/api/test-plans', tetsPlansRoutes);
app.use('/api/test-cases', tetsCasesRoutes);
app.use('/api/defects', defectsRoutes);


// Ruta principal
app.get('/', (req, res) => {
    res.send('API de SGP en funcionamiento');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
