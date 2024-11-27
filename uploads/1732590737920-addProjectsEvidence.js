const { By } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

module.exports = async (driver) => {
    const startTime = Date.now();
    const evidenceDir = path.join(__dirname, '../uploads/evidence');
    const evidencePath = path.join(evidenceDir, `${Date.now()}-screenshot.png`);

    if (!fs.existsSync(evidenceDir)) {
        fs.mkdirSync(evidenceDir, { recursive: true });
        console.log('Directorio de evidencias creado:', evidenceDir);
    }

    try {
        // Datos del proyecto
        const projectData = {
            name: 'Nuevo Proyecto Automatizado',
            description: 'Este proyecto prueba flujos automatizados',
            start_date: '2024-11-16',
            end_date: '2024-12-20',
            status: 'activo',
            created_by: 'Patricia'
        };

        // Crear el proyecto
        const projectResponse = await axios.post('http://localhost:3001/api/proyectos', projectData);
        console.log('Proyecto creado con éxito:', projectResponse.data);

        // Tomar captura de pantalla
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(evidencePath, screenshot, 'base64');
        console.log('Evidencia guardada en:', evidencePath);

        const endTime = Date.now();
        return {
            executionTime: (endTime - startTime) / 1000,
            evidence: evidencePath,
            status: 'exitoso',
        };
    } catch (error) {
        console.error('Error en la prueba:', error.message);

        // Registrar defecto
        const defectData = {
            testCaseId: 10,
            projectId: 1,
            reportedBy: 3,
            description: error.message,
            severity: 'alto',
        };
        try {
            const defectResponse = await axios.post('http://localhost:3001/api/defects', defectData);
            console.log('Defecto registrado:', defectResponse.data);

            // Subir evidencia
            if (fs.existsSync(evidencePath)) {
                const formData = new FormData();
                formData.append('testResultId', defectResponse.data.results.insertId);
                formData.append('evidence', fs.createReadStream(evidencePath));

                const evidenceResponse = await axios.post('http://localhost:3001/api/test-evidence/evidence', formData, {
                    headers: formData.getHeaders(),
                });
                console.log('Evidencia registrada con éxito:', evidenceResponse.data);
            } else {
                console.warn('No se encontró la captura de pantalla para registrar como evidencia.');
            }
        } catch (defectError) {
            console.error('Error al registrar defecto o evidencia:', defectError.response?.data || defectError.message);
        }

        throw new Error('Prueba fallida: ' + error.message);
    }
};
