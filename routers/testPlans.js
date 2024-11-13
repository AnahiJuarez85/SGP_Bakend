const express = require('express');
const TestPlans = require('../models/testPlans');
const router = express.Router();

// Ruta para agregar un plan de prueba
router.post('/', async (req, res) => {
    const { projectId, name, createdBy, description } = req.body;

    if (!projectId || !name || !createdBy || !description) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await TestPlans.addTestPlan(projectId, name, createdBy, description);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al agregar el plan de prueba:", error.message);
        res.status(500).json({ error: 'Error al agregar el plan de prueba' });
    }
});

// Ruta para actualizar un plan de prueba
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await TestPlans.updateTestPlan(id, name, description);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al actualizar el plan de prueba:", error.message);
        res.status(500).json({ error: 'Error al actualizar el plan de prueba' });
    }
});

// Ruta para obtener todos los planes de prueba por proyecto
router.get('/project/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const testPlans = await TestPlans.getTestPlansByProject(projectId);
        res.json(testPlans);
    } catch (error) {
        console.log("Error al obtener planes de prueba por proyecto:", error.message);
        res.status(500).json({ error: 'Error al obtener planes de prueba' });
    }
});

// Ruta para obtener un plan de prueba por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const testPlan = await TestPlans.getTestPlanById(id);
        if (!testPlan) {
            return res.status(404).json({ error: 'Plan de prueba no encontrado' });
        }
        res.json(testPlan);
    } catch (error) {
        console.log("Error al obtener el plan de prueba:", error.message);
        res.status(500).json({ error: 'Error al obtener el plan de prueba' });
    }
});

module.exports = router;
