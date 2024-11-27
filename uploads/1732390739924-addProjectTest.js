const { By, until } = require('selenium-webdriver');
const axios = require('axios');

module.exports = async (driver) => {
    const startTime = Date.now();
    try {
        // Definir el endpoint y los datos del proyecto
        const endpoint = 'http://localhost:3001/api/proyectos';
        const projectData = {
            name: 'Nuevo Proyecto',
            description: 'Este es un proyecto creado por Selenium',
            start_date: '2024-11-16',
            end_date: '2024-12-20',
            status: 'activo',
            created_by: 'Patricia'
        };

        const response = await axios.post(endpoint, projectData);

        // Verificar la respuesta del servidor
        if (response.status === 200 && response.data.message === 'Proyecto agregado con éxito') {
            console.log('El proyecto se creó exitosamente:', response.data.result);
        } else {
            throw new Error('El proyecto no se creó correctamente');
        }

        const endTime = Date.now();
        return { executionTime: (endTime - startTime) / 1000 }; // Tiempo en segundos
    } catch (error) {
        throw new Error('Prueba fallida: ' + error.message);
    }
};
