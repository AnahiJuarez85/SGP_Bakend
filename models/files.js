const pool = require('../config/db');

class Files {
    // Agregar un archivo
    static async addFile(projectId, filePath) {
        try {
            const query = 'CALL AddFile(?, ?)';
            const [results] = await pool.query(query, [projectId, filePath]);
            console.log("Archivo agregado con éxito:", results);
            return { message: 'Archivo agregado con éxito', results };
        } catch (error) {
            console.error("Error al agregar el archivo:", error);
            throw error;
        }
    }

    // Obtener todos los archivos por proyecto
    static async getFilesByProject(projectId) {
        try {
            const query = 'CALL GetFilesByProject(?)';
            const [results] = await pool.query(query, [projectId]);
            console.log("Archivos obtenidos por proyecto:", results[0]);
            return results[0];
        } catch (error) {
            console.error("Error al obtener los archivos:", error);
            throw error;
        }
    }

    // Eliminar un archivo por ID
    static async deleteFile(id) {
        try {
            const query = 'CALL DeleteFile(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Archivo eliminado con éxito:", results);
            return { message: 'Archivo eliminado con éxito', results };
        } catch (error) {
            console.error("Error al eliminar el archivo:", error);
            throw error;
        }
    }
}

module.exports = Files;
