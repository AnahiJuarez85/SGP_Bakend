const express = require('express');
const upload = require('../middleware/upload'); // Middleware para archivos
const TestEvidence = require('../models/testEvidence');
const router = express.Router();

// Ruta para subir evidencia
router.post('/evidence', upload.single('evidence'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
        }
        console.log('Datos recibidos en el POST de evidencia:', req.body, req.file);
        const { testResultId } = req.body; // Obtén el ID del resultado de prueba
        const filePath = req.file.path; // Ruta del archivo

        if (!testResultId) {
            return res.status(400).json({ error: 'El campo testResultId es obligatorio' });
        }

        // Agregar evidencia a la base de datos
        const result = await TestEvidence.addTestEvidence(testResultId, filePath);
        res.json({ message: 'Evidencia registrada con éxito', result });
    } catch (error) {
        console.error('Error al registrar la evidencia:', error.message);
        res.status(500).json({ error: 'Error al registrar la evidencia' });
    }
});

// Ruta para obtener evidencias por resultado de prueba
router.get('/evidence/result/:testResultId', async (req, res) => {
    try {
        const { testResultId } = req.params;
        const evidence = await TestEvidence.getTestEvidenceByResult(testResultId);
        res.json(evidence);
    } catch (error) {
        console.error('Error al obtener la evidencia:', error.message);
        res.status(500).json({ error: 'Error al obtener la evidencia' });
    }
});

module.exports = router;
