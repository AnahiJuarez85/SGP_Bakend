const express = require('express');
const Reports = require('../models/reports');
const router = express.Router();

// Ruta para agregar un reporte
router.post('/', async (req, res) => {
    const { projectId, coverage, defectDensity, averageResolutionTime } = req.body;

    if (!projectId || coverage === undefined || defectDensity === undefined || averageResolutionTime === undefined) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Reports.addReport(projectId, coverage, defectDensity, averageResolutionTime);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al agregar el reporte:", error.message);
        res.status(500).json({ error: 'Error al agregar el reporte' });
    }
});

// Ruta para actualizar un reporte
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { coverage, defectDensity, averageResolutionTime } = req.body;

    if (coverage === undefined || defectDensity === undefined || averageResolutionTime === undefined) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Reports.updateReport(id, coverage, defectDensity, averageResolutionTime);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al actualizar el reporte:", error.message);
        res.status(500).json({ error: 'Error al actualizar el reporte' });
    }
});

// Ruta para obtener todos los reportes por proyecto
router.get('/project/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const reports = await Reports.getReportsByProject(projectId);
        res.json(reports);
    } catch (error) {
        console.log("Error al obtener reportes por proyecto:", error.message);
        res.status(500).json({ error: 'Error al obtener reportes' });
    }
});

// Ruta para obtener un reporte por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Reports.getReportById(id);
        if (!report) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }
        res.json(report);
    } catch (error) {
        console.log("Error al obtener el reporte:", error.message);
        res.status(500).json({ error: 'Error al obtener el reporte' });
    }
});

module.exports = router;
