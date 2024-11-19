const pool = require('../config/db');

class TestEvidence {
    // Agregar evidencia de prueba
    static async addTestEvidence(testResultId, filePath) {
        const query = 'CALL AddTestEvidence(?, ?)';
        const [results] = await pool.query(query, [testResultId, filePath]);
        return results;
    }

    // Obtener evidencia por resultado de prueba
    static async getTestEvidenceByResult(testResultId) {
        const query = 'CALL GetTestResultsByTestCase(?)';
        const [results] = await pool.query(query, [testResultId]);
        return results;
    }
}

module.exports = TestEvidence;
