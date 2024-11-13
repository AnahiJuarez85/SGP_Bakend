const pool = require('../config/db');

class TestPlans {
    // Agregar un plan de prueba
    static async addTestPlan(projectId, name, createdBy, description) {
        try {
            const query = 'CALL AddTestPlan(?, ?, ?, ?)';
            const [results] = await pool.query(query, [projectId, name, createdBy, description]);
            console.log("Plan de prueba agregado con éxito:", results);
            return { message: 'Plan de prueba agregado con éxito', results };
        } catch (error) {
            console.error("Error al agregar el plan de prueba:", error);
            throw error;
        }
    }

    // Actualizar un plan de prueba
    static async updateTestPlan(id, name, description) {
        try {
            const query = 'CALL UpdateTestPlan(?, ?, ?)';
            const [results] = await pool.query(query, [id, name, description]);
            console.log("Plan de prueba actualizado con éxito:", results);
            return { message: 'Plan de prueba actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el plan de prueba:", error);
            throw error;
        }
    }

    // Obtener todos los planes de prueba por proyecto
    static async getTestPlansByProject(projectId) {
        try {
            const query = 'CALL GetTestPlansByProject(?)';
            const [results] = await pool.query(query, [projectId]);
            console.log("Planes de prueba obtenidos por proyecto:", results[0]);
            return results[0];
        } catch (error) {
            console.error("Error al obtener los planes de prueba:", error);
            throw error;
        }
    }

    // Obtener un plan de prueba por ID
    static async getTestPlanById(id) {
        try {
            const query = 'CALL GetTestPlanById(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Plan de prueba obtenido por ID:", results[0]);
            return results[0][0];
        } catch (error) {
            console.error("Error al obtener el plan de prueba:", error);
            throw error;
        }
    }
}

module.exports = TestPlans;
