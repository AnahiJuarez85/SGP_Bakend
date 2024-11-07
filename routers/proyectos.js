const express = require('express');
const Proyectos = require('../models/proyectos');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const proyectos = await Proyectos.getAll();
        res.json(proyectos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los proyectos');
    }
});

router.post('/', async (req, res) => {
    const { name, description, start_date, end_date, status, created_by } = req.body;

    console.log("Datos recibidos en la solicitud POST /api/projects:", { name, description, start_date, end_date, status, created_by });

    if (!name || !description || !start_date || !end_date || !status || !created_by) {
        console.log("Error: Todos los campos son obligatorios");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Convertir las fechas al formato YYYY-MM-DD
        const formattedStartDate = new Date(start_date).toISOString().slice(0, 10);
        const formattedEndDate = new Date(end_date).toISOString().slice(0, 10);

        const [userResult] = await pool.query('SELECT id FROM Users WHERE username = ?', [created_by]);
        
        if (userResult.length === 0) {
            console.log("Error: Usuario no encontrado");
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const userId = userResult[0].id; // ID del usuario encontrado

        // Llamar al procedimiento almacenado para agregar el proyecto con el ID del usuario
        const result = await Projects.addProject(name, description, formattedStartDate, formattedEndDate, status, userId);
        
        console.log("Respuesta enviada al cliente:", result);
        res.json(result);
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        console.log("Error al agregar el proyecto:", error.message);
        res.status(500).json({ error: 'Error al agregar el proyecto' });
    }
});

// Ruta para actualizar un proyecto
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;

    if (!name || !description || !startDate || !endDate || !status) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Projects.updateProject(id, name, description, startDate, endDate, status);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener proyectos por usuario
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const projects = await Projects.getProjectsByUser(userId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;