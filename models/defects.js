const pool = require('../config/db');

class Defects {
    // Agregar un defecto
    static async addDefect(testCaseId, projectId, reportedBy, description, severity) {
        try {
            const query = 'CALL AddDefect(?, ?, ?, ?, ?)';
            const [results] = await pool.query(query, [testCaseId, projectId, reportedBy, description, severity]);
            console.log("Defecto agregado con éxito:", results);
            return { message: 'Defecto agregado con éxito', results };
        } catch (error) {
            console.error("Error al agregar el defecto:", error);
            throw error;
        }
    }

    // Actualizar un defecto
    static async updateDefect(id, description, severity, status) {
        try {
            const query = 'CALL UpdateDefect(?, ?, ?, ?)';
            const [results] = await pool.query(query, [id, description, severity, status]);
            console.log("Defecto actualizado con éxito:", results);
            return { message: 'Defecto actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el defecto:", error);
            throw error;
        }
    }

    // Obtener todos los defectos por proyecto
    static async getDefectsByProject(projectId) {
        try {
            const query = 'CALL GetDefectsByProject(?)';
            const [results] = await pool.query(query, [projectId]);
            console.log("Defectos obtenidos por proyecto:", results[0]);
            return results[0];
        } catch (error) {
            console.error("Error al obtener los defectos:", error);
            throw error;
        }
    }

    // Obtener un defecto por ID
    static async getDefectById(id) {
        try {
            const query = 'CALL GetDefectById(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Defecto obtenido por ID:", results[0]);
            return results[0][0];
        } catch (error) {
            console.error("Error al obtener el defecto:", error);
            throw error;
        }
    }
}

module.exports = Defects;
