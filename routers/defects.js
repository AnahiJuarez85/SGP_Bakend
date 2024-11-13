const express = require('express');
const Defects = require('../models/defects');
const router = express.Router();

// Ruta para agregar un defecto
router.post('/', async (req, res) => {
    const { testCaseId, projectId, reportedBy, description, severity } = req.body;

    if (!testCaseId || !projectId || !reportedBy || !description || !severity) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Defects.addDefect(testCaseId, projectId, reportedBy, description, severity);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al agregar el defecto:", error.message);
        res.status(500).json({ error: 'Error al agregar el defecto' });
    }
});

// Ruta para actualizar un defecto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, severity, status } = req.body;

    if (!description || !severity || !status) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Defects.updateDefect(id, description, severity, status);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al actualizar el defecto:", error.message);
        res.status(500).json({ error: 'Error al actualizar el defecto' });
    }
});

// Ruta para obtener todos los defectos por proyecto
router.get('/project/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const defects = await Defects.getDefectsByProject(projectId);
        res.json(defects);
    } catch (error) {
        console.log("Error al obtener defectos por proyecto:", error.message);
        res.status(500).json({ error: 'Error al obtener defectos' });
    }
});

// Ruta para obtener un defecto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const defect = await Defects.getDefectById(id);
        if (!defect) {
            return res.status(404).json({ error: 'Defecto no encontrado' });
        }
        res.json(defect);
    } catch (error) {
        console.log("Error al obtener el defecto:", error.message);
        res.status(500).json({ error: 'Error al obtener el defecto' });
    }
});

module.exports = router;
