const pool = require('../config/db');

class Proyectos {

    //obtener todos los proyectos
    static async getAll() {
        try {
            const [results] = await pool.query('CALL GetAllProjects()');
            console.log("Consulta ejecutada: Obteniendo todos los proyectos");
            return results[0];
        } catch (error) {
            console.error("Error al obtener los proyectos:", error);
            throw error;
        }
    }
    //agregar nuevos proyectos
    static async addProject(name, description, start_date, end_date, status, created_by) {
        try {
            console.log("Datos recibidos en addProject:", { name, description, start_date, end_date, status, created_by });
            const query = 'CALL AddProject(?, ?, ?, ?, ?, ?)';
            const [results] = await pool.query(query, [name, description, start_date, end_date, status, created_by]);
            console.log("Proyecto agregado con éxito");
            return { message: 'Proyecto agregado con éxito', results };
        } catch (error) {
            if (error.sqlState === '45000') {
                console.error("Error al agregar el proyecto:", error.message);
                throw new Error(error.message); 
            }
            console.error("Error inesperado al agregar el proyecto:", error);
            throw error;
        }
    }

    // Actualizar un proyecto
    static async updateProject(id, name, description, startDate, endDate, status) {
        try {
            const query = 'CALL UpdateProject(?, ?, ?, ?, ?, ?)';
            const [results] = await pool.query(query, [id, name, description, startDate, endDate, status]);
            console.log("Proyecto actualizado con éxito");
            return { message: 'Proyecto actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
            throw error;
        }
    }

    // Obtener proyectos por usuario
    static async getProjectsByUser(userId) {
        try {
            const query = 'CALL GetProjectsByUser(?)';
            const [results] = await pool.query(query, [userId]);
            console.log("Proyectos obtenidos por usuario");
            return results[0]; // Devuelve la lista de proyectos del usuario
        } catch (error) {
            console.error("Error al obtener los proyectos:", error);
            throw error;
        }
    }

}

module.exports = Proyectos;