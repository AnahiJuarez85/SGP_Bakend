const pool = require('../config/db');

class TestResults {
    // Agregar un resultado de prueba
    static async addTestResult(testCaseId, executedBy, status, errorMessage, executionTime) {
        const query = 'CALL AddTestResult(?, ?, ?, ?, ?)';
        const [results] = await pool.query(query, [testCaseId, executedBy, status, errorMessage, executionTime]);
        return results;
    }

    // Obtener resultados por caso de prueba
    static async getTestResultsByTestCase(testCaseId) {
        const query = 'CALL GetTestResultsByTestCase(?)';
        const [results] = await pool.query(query, [testCaseId]);
        return results;
    }
}

module.exports = TestResults;
