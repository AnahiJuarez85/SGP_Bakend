const pool = require('../config/db');

class TestCases {
    // Agregar un caso de prueba
    static async addTestCase(testPlanId, description, expectedResult) {
        try {
            const query = 'CALL AddTestCase(?, ?, ?)';
            const [results] = await pool.query(query, [testPlanId, description, expectedResult]);
            console.log("Caso de prueba agregado con éxito:", results);
            return { message: 'Caso de prueba agregado con éxito', results };
        } catch (error) {
            console.error("Error al agregar el caso de prueba:", error);
            throw error;
        }
    }

    // Actualizar un caso de prueba
    static async updateTestCase(id, description, expectedResult, status) {
        try {
            const query = 'CALL UpdateTestCase(?, ?, ?, ?)';
            const [results] = await pool.query(query, [id, description, expectedResult, status]);
            console.log("Caso de prueba actualizado con éxito:", results);
            return { message: 'Caso de prueba actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el caso de prueba:", error);
            throw error;
        }
    }

    // Obtener todos los casos de prueba por plan de prueba
    static async getTestCasesByTestPlan(testPlanId) {
        try {
            const query = 'CALL GetTestCasesByTestPlan(?)';
            const [results] = await pool.query(query, [testPlanId]);
            console.log("Casos de prueba obtenidos por plan de prueba:", results[0]);
            return results[0];
        } catch (error) {
            console.error("Error al obtener los casos de prueba:", error);
            throw error;
        }
    }

    // Obtener un caso de prueba por ID
    static async getTestCaseById(id) {
        try {
            const query = 'CALL GetTestCaseById(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Caso de prueba obtenido por ID:", results[0]);
            return results[0][0];
        } catch (error) {
            console.error("Error al obtener el caso de prueba:", error);
            throw error;
        }
    }
}

module.exports = TestCases;
