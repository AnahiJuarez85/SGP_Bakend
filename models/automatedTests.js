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

    try {
        const [results] = await pool.query(query, [testCaseId]);
        console.log("Resultados completos del procedimiento almacenado:", results);

        // Retorna los resultados reales (primer elemento del array)
        if (results && Array.isArray(results[0])) {
            return results[0]; // Devuelve solo los datos reales
        }

        console.error("El procedimiento no devolvió datos esperados:", results);
        return []; // Devuelve un arreglo vacío si no hay resultados
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado:", error);
        throw error;
    }
}

}

module.exports = AutomatedTests;
