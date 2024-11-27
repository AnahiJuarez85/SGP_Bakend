const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routers/usuarios');
const projectsRoutes = require('./routers/proyectos');
const tetsPlansRoutes = require('./routers/testPlans');
const tetsCasesRoutes = require('./routers/testCases');
const defectsRoutes = require('./routers/defects');
const reportsRoutes = require('./routers/reports');
const filessRoutes = require('./routers/files');
const automatedTestsRoutes = require('./routers/automatedTests');
const testEvidenceRoutes = require('./routers/testEvidence');
const testResultsRoutes = require('./routers/testResult');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const fs = require('fs');
const path = require('path');


const evidenceDir = path.join(__dirname, 'uploads/evidence');
if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
    console.log('Directorio de evidencias creado:', evidenceDir);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/usuarios', usersRoutes);
app.use('/api/proyectos', projectsRoutes);
app.use('/api/test-plans', tetsPlansRoutes);
app.use('/api/test-cases', tetsCasesRoutes);
app.use('/api/defects', defectsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/files', filessRoutes);
app.use('/api/automated', automatedTestsRoutes);
app.use('/api/test-evidence', testEvidenceRoutes);
app.use('/api/test-result', testResultsRoutes);


// Ruta principal
app.get('/', (req, res) => {
    res.send('API de SGP en funcionamiento');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
