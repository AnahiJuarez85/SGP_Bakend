const pool = require('../config/db');

class Reports {
    // Agregar un reporte
    static async addReport(projectId, coverage, defectDensity, averageResolutionTime) {
        try {
            const query = 'CALL AddReport(?, ?, ?, ?)';
            const [results] = await pool.query(query, [projectId, coverage, defectDensity, averageResolutionTime]);
            console.log("Reporte agregado con éxito:", results);
            return { message: 'Reporte agregado con éxito', results };
        } catch (error) {
            console.error("Error al agregar el reporte:", error);
            throw error;
        }
    }

    // Actualizar un reporte
    static async updateReport(id, coverage, defectDensity, averageResolutionTime) {
        try {
            const query = 'CALL UpdateReport(?, ?, ?, ?)';
            const [results] = await pool.query(query, [id, coverage, defectDensity, averageResolutionTime]);
            console.log("Reporte actualizado con éxito:", results);
            return { message: 'Reporte actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el reporte:", error);
            throw error;
        }
    }

    // Obtener todos los reportes por proyecto
    static async getReportsByProject(projectId) {
        try {
            const query = 'CALL GetReportsByProject(?)';
            const [results] = await pool.query(query, [projectId]);
            console.log("Reportes obtenidos por proyecto:", results[0]);
            return results[0];
        } catch (error) {
            console.error("Error al obtener los reportes:", error);
            throw error;
        }
    }

    // Obtener un reporte por ID
    static async getReportById(id) {
        try {
            const query = 'CALL GetReportById(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Reporte obtenido por ID:", results[0]);
            return results[0][0];
        } catch (error) {
            console.error("Error al obtener el reporte:", error);
            throw error;
        }
    }
}

module.exports = Reports;
