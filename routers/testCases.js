const express = require('express');
const TestCases = require('../models/testCases');
const router = express.Router();

// Ruta para agregar un caso de prueba
router.post('/', async (req, res) => {
    const { testPlanId, description, expectedResult } = req.body;

    if (!testPlanId || !description || !expectedResult) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await TestCases.addTestCase(testPlanId, description, expectedResult);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al agregar el caso de prueba:", error.message);
        res.status(500).json({ error: 'Error al agregar el caso de prueba' });
    }
});

// Ruta para actualizar un caso de prueba
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, expectedResult, status } = req.body;

    if (!description || !expectedResult || !status) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await TestCases.updateTestCase(id, description, expectedResult, status);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al actualizar el caso de prueba:", error.message);
        res.status(500).json({ error: 'Error al actualizar el caso de prueba' });
    }
});

// Ruta para obtener todos los casos de prueba por plan de prueba
router.get('/testplan/:testPlanId', async (req, res) => {
    const { testPlanId } = req.params;

    try {
        const testCases = await TestCases.getTestCasesByTestPlan(testPlanId);
        res.json(testCases);
    } catch (error) {
        console.log("Error al obtener casos de prueba por plan de prueba:", error.message);
        res.status(500).json({ error: 'Error al obtener casos de prueba' });
    }
});

// Ruta para obtener un caso de prueba por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const testCase = await TestCases.getTestCaseById(id);
        if (!testCase) {
            return res.status(404).json({ error: 'Caso de prueba no encontrado' });
        }
        res.json(testCase);
    } catch (error) {
        console.log("Error al obtener el caso de prueba:", error.message);
        res.status(500).json({ error: 'Error al obtener el caso de prueba' });
    }
});

module.exports = router;
