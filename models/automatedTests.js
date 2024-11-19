const pool = require('../config/db');

class AutomatedTests {
    // Agregar un script de prueba automatizada
    static async addAutomatedTest(testCaseId, scriptPath, uploadedBy) {
        const query = 'CALL AddAutomatedTest(?, ?, ?)';
        const [results] = await pool.query(query, [testCaseId, scriptPath, uploadedBy]);
        return results;
    }

    // Obtener scripts por caso de prueba
    static async getScriptPathByTestCase(testCaseId) {
        const query = 'CALL GetAutomatedTestsByTestCase(?)';
        const [results] = await pool.query(query, [testCaseId]);
        return results[0]; // Retorna el primer script encontrado
    }
}

module.exports = AutomatedTests;
