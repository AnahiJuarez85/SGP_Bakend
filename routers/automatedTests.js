const express = require('express');
const SeleniumService = require('../services/seleniumService');
const AutomatedTests = require('../models/automatedTests');
const TestResults = require('../models/testResult');
const upload = require('../middleware/upload'); 
const router = express.Router();

router.post('/execute', async (req, res) => {
    const { testCaseId, executedBy } = req.body;

    if (!testCaseId || !executedBy) {
        return res.status(400).json({ error: 'Campos obligatorios: testCaseId, executedBy' });
    }

    try {
        // Obtener la ruta del script desde la base de datos
        const scripts = await AutomatedTests.getScriptPathByTestCase(testCaseId);
        if (scripts.length === 0) {
            return res.status(404).json({ error: 'No hay scripts asociados a este caso de prueba' });
        }

        const scriptPath = scripts[0].script_path;

        // Ejecutar el script con Selenium
        const result = await SeleniumService.executeTest(scriptPath);
        const status = result.success ? 'aprobado' : 'fallido';

        // Registrar el resultado de la prueba
        await TestResults.addTestResult(testCaseId, executedBy, status, result.error, result.executionTime);

        res.json({
            message: 'Prueba ejecutada con éxito',
            result,
        });
    } catch (error) {
        console.error('Error al ejecutar la prueba:', error);
        res.status(500).json({ error: 'Error al ejecutar la prueba' });
    }
});

router.post('/scripts', upload.single('script'), async (req, res) => {
    const { testCaseId, uploadedBy } = req.body;
    const scriptPath = req.file.path;

    if (!testCaseId || !uploadedBy) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await AutomatedTests.addAutomatedTest(testCaseId, scriptPath, uploadedBy);
        res.json({ message: 'Script subido con éxito', result });
    } catch (error) {
        console.error('Error al subir el script:', error);
        res.status(500).json({ error: 'Error al subir el script' });
    }
});

// Ruta para obtener scripts por caso de prueba
router.get('/scripts/testcase/:testCaseId', async (req, res) => {
    const { testCaseId } = req.params;

    try {
        const scripts = await AutomatedTests.getScriptPathByTestCase(testCaseId);
        res.json(scripts);
    } catch (error) {
        console.error('Error al obtener los scripts:', error);
        res.status(500).json({ error: 'Error al obtener los scripts' });
    }
});

module.exports = router;
