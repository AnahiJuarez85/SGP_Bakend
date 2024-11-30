const { By, until } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (driver) => {
    const startTime = Date.now(); // Iniciar tiempo de ejecución

    // Crear ruta para la captura de pantalla
    const evidenceDir = path.resolve(__dirname, '../uploads/evidence');
    if (!fs.existsSync(evidenceDir)) {
        fs.mkdirSync(evidenceDir, { recursive: true });
        console.log('Directorio de evidencias creado:', evidenceDir);
    }
    const screenshotPath = path.resolve(evidenceDir, `${Date.now()}-screenshot.png`);

    try {
        // Datos del proyecto a crear
        const projectData = {
            name: 'Nuevo Proyecto Automatizado',
            description: 'Este proyecto prueba flujos automatizados',
            start_date: '2024-11-16',
            end_date: '2024-12-20',
            status: 'activo',
            created_by: '9'  // Cambia por un usuario existente
        };

        // Endpoint para crear un proyecto
        const endpoint = 'http://localhost:3000/api/projects';
        const response = await axios.post(endpoint, projectData);

        // Validar respuesta del servidor
        if (response.status === 200 && response.data.message === 'Proyecto agregado con éxito') {
            console.log('Proyecto creado con éxito:', response.data.result);

            // Captura de pantalla como evidencia
            try {
                const screenshot = await driver.takeScreenshot();
                fs.writeFileSync(screenshotPath, screenshot, 'base64');
                console.log('Evidencia guardada en:', screenshotPath);
            } catch (screenshotError) {
                console.error('Error al guardar la captura de pantalla:', screenshotError.message);
                throw new Error('Error en la generación de evidencias: ' + screenshotError.message);
            }

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
            testCaseId: 2, // ID del caso de prueba asociado
            projectId: 1, // ID del proyecto asociado
            reportedBy: 3, // Usuario que reporta
            description: error.message,
            severity: 'alto' // Ajustar severidad según corresponda
        };

        try {
            const defectEndpoint = 'http://localhost:3001/api/defects';
            const defectResponse = await axios.post(defectEndpoint, defectData);
            console.log('Defecto registrado con éxito:', defectResponse.data);

            // Registrar evidencia asociada al defecto
            const evidenceData = {
                defectId: defectResponse.data.results.insertId, // ID del defecto registrado
                filePath: screenshotPath
            };

            const evidenceEndpoint = 'http://localhost:3001/api/test-evidence';
            const evidenceResponse = await axios.post(evidenceEndpoint, evidenceData);
            console.log('Evidencia registrada con éxito:', evidenceResponse.data);
        } catch (defectError) {
            console.error('Error al registrar el defecto o la evidencia:', defectError.message);
        }

        throw new Error('Prueba fallida: ' + error.message);
    }
};
