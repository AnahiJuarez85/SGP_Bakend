const express = require('express');
const Usuarios = require('../models/usuarios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuarios.getAll();
        res.json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.post('/', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Usuarios.insertUsuario(username, email, password, role);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Usuarios.updateUser(id, username, email, password, role);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Usuarios.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Usuarios.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Se requiere email y contraseña' });
    }

    try {
        const user = await Usuarios.verifyUserCredentials(email, password);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;