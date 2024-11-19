const express = require('express');
const Files = require('../models/files');
const router = express.Router();

// Ruta para agregar un archivo
router.post('/', async (req, res) => {
    const { projectId, filePath } = req.body;

    if (!projectId || !filePath) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Files.addFile(projectId, filePath);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al agregar el archivo:", error.message);
        res.status(500).json({ error: 'Error al agregar el archivo' });
    }
});

// Ruta para obtener todos los archivos por proyecto
router.get('/project/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const files = await Files.getFilesByProject(projectId);
        res.json(files);
    } catch (error) {
        console.log("Error al obtener archivos por proyecto:", error.message);
        res.status(500).json({ error: 'Error al obtener archivos' });
    }
});

// Ruta para eliminar un archivo por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Files.deleteFile(id);
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        console.log("Error al eliminar el archivo:", error.message);
        res.status(500).json({ error: 'Error al eliminar el archivo' });
    }
});

module.exports = router;
