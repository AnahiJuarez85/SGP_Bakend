const express = require('express');
const TestResults = require('../models/testResult');
const router = express.Router();

// Ruta para registrar un resultado de prueba
router.post('/results', async (req, res) => {
    const { testCaseId, executedBy, status, errorMessage, executionTime } = req.body;

    if (!testCaseId || !executedBy || !status) {
        return res.status(400).json({ error: 'Campos obligatorios: testCaseId, executedBy, status' });
    }

    try {
        const result = await TestResults.addTestResult(testCaseId, executedBy, status, errorMessage, executionTime);
        res.json({ message: 'Resultado registrado con éxito', result });
    } catch (error) {
        console.error('Error al registrar el resultado:', error);
        res.status(500).json({ error: 'Error al registrar el resultado' });
    }
});

// Ruta para obtener resultados por caso de prueba
router.get('/results/testcase/:testCaseId', async (req, res) => {
    const { testCaseId } = req.params;

    try {
        const results = await TestResults.getTestResultsByTestCase(testCaseId);
        res.json(results);
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
});

module.exports = router;
