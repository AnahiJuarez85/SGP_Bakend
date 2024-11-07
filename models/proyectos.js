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
    static async updateProject(id, name, description, start_date, end_date, status) {
        try {
            const query = 'CALL UpdateProject(?, ?, ?, ?, ?, ?)';
            const [results] = await pool.query(query, [id, name, description, start_date, end_date, status]);
            console.log("Proyecto actualizado con éxito");
            return { message: 'Proyecto actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
            throw error;
        }
    }
    static async getProjectsByUsername(username) {
        try {
            const query = 'CALL GetProjectsByUsername(?)';
            const [results] = await pool.query(query, [username]);
            console.log("Proyectos obtenidos por nombre de usuario:", results[0]);
            return results[0]; 
        } catch (error) {
            if (error.sqlState === '45000') {
                console.error("Error al obtener proyectos (usuario no encontrado):", error.message);
                throw new Error(error.message); 
            }
            console.error("Error inesperado al obtener proyectos:", error);
            throw error;
        }
    }

    // Obtener un proyecto por ID
    static async getProjectById(projectId) {
        try {
            const query = 'CALL GetProjectById(?)';
            const [results] = await pool.query(query, [projectId]);
            console.log("Proyecto obtenido por ID:", results[0]);
            return results[0][0];
        } catch (error) {
            console.error("Error al obtener el proyecto:", error);
            throw error;
        }
    }

    

}

module.exports = Proyectos;