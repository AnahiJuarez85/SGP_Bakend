const { By, until } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (driver) => {
    const startTime = Date.now(); // Iniciar tiempo de ejecución
    const screenshotPath = path.resolve(__dirname, `../uploads/evidence/${Date.now()}-screenshot.png`);

    try {
        // Datos del proyecto a crear
        const projectData = {
            name: 'Nuevo Proyecto Automatizado',
            description: 'Este proyecto prueba flujos automatizados',
            start_date: '2024-11-16',
            end_date: '2024-12-20',
            status: 'activo',
            created_by: 'Patricia'
        };

        // Endpoint para crear un proyecto
        const endpoint = 'http://localhost:3001/api/proyectos';
        const response = await axios.post(endpoint, projectData);

        // Validar respuesta del servidor
        if (response.status === 200 && response.data.message === 'Proyecto agregado con éxito') {
            console.log('Proyecto creado con éxito:', response.data.result);

            // Captura de pantalla como evidencia
            const screenshot = await driver.takeScreenshot();
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log('Evidencia guardada en:', screenshotPath);

            const endTime = Date.now(); // Finalizar tiempo de ejecución
            return {
                executionTime: (endTime - startTime) / 1000, // Tiempo en segundos
                evidence: screenshotPath,
                status: 'exitoso'
            };
        } else {
            throw new Error('El proyecto no se creó correctamente');
        }
    } catch (error) {
        console.error('Error en la prueba:', error.message);

        // Registrar defecto (bug) en caso de error
        const defectData = {
            testCaseId: 1, // ID del caso de prueba
            projectId: 1, // ID del proyecto asociado
            reportedBy: 1, // Usuario que reporta
            description: error.message,
            severity: 'alto' // Ajustar severidad
        };

        try {
            const defectEndpoint = 'http://localhost:3001/api/defects';
            const defectResponse = await axios.post(defectEndpoint, defectData);
            console.log('Defecto registrado con éxito:', defectResponse.data);
        } catch (defectError) {
            console.error('Error al registrar el defecto:', defectError.message);
        }

        throw new Error('Prueba fallida: ' + error.message);
    }
};
