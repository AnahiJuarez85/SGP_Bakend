const pool = require('../config/db');

class TestEvidence {
    // Método para agregar evidencia
    static async addTestEvidence(testResultId, filePath) {
        console.log('Datos enviados al procedimiento almacenado:', { testResultId, filePath });
        const query = 'CALL AddTestEvidence(?, ?)';
        const values = [testResultId, filePath];
        try {
            const [results] = await pool.query(query, values);
            return results; // Devuelve resultados del procedimiento
        } catch (error) {
            throw error; // Maneja errores
        }
    }

    // Método para obtener evidencia por resultado de prueba
    static async getTestEvidenceByResult(testResultId) {
        const query = 'CALL GetTestEvidenceByResult(?)';
        const [results] = await pool.query(query, [testResultId]);
        return results[0]; 
    }
}

module.exports = TestEvidence;
