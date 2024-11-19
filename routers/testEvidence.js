const express = require('express');
const TestEvidence = require('../models/testEvidence');
const upload = require('../middleware/upload'); 
const router = express.Router();

// Ruta para subir evidencia de prueba
router.post('/evidence', upload.single('evidence'), async (req, res) => {
    const { testResultId } = req.body;
    const filePath = req.file.path;

    if (!testResultId) {
        return res.status(400).json({ error: 'El campo testResultId es obligatorio' });
    }

    try {
        const result = await TestEvidence.addTestEvidence(testResultId, filePath);
        res.json({ message: 'Evidencia registrada con éxito', result });
    } catch (error) {
        console.error('Error al registrar la evidencia:', error);
        res.status(500).json({ error: 'Error al registrar la evidencia' });
    }
});

// Ruta para obtener evidencia por resultado de prueba
router.get('/evidence/result/:testResultId', async (req, res) => {
    const { testResultId } = req.params;

    try {
        const evidence = await TestEvidence.getTestEvidenceByResult(testResultId);
        res.json(evidence);
    } catch (error) {
        console.error('Error al obtener la evidencia:', error);
        res.status(500).json({ error: 'Error al obtener la evidencia' });
    }
});

module.exports = router;
