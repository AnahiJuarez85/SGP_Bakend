const pool = require('../config/db');

class Usuarios {
    static async getAll() {
        try {
            const [results] = await pool.query('CALL GetAllUsers()');
            console.log("Consulta ejecutada: Obteniendo todos los usuarios");
            return results[0];
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw error;
        }
    }

    static async insertUsuario(username, email, password, role) {
        try {
            const [results] = await pool.query('CALL AddUser(?, ?, ?, ?)', [username, email, password, role]);
            console.log("Usuario insertado con éxito");
            return { message: 'Usuario insertado con éxito', results };
        } catch (error) {
            console.error("Error al insertar el usuario:", error);
            throw error;
        }
    }

    static async updateUser(id, username, email, password, role) {
        try {
            const query = 'CALL UpdateUser(?, ?, ?, ?, ?)';
            const [results] = await pool.query(query, [id, username, email, password, role]);
            console.log("Usuario actualizado con éxito");
            return { message: 'Usuario actualizado con éxito', results };
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw error;
        }
    }


    static async deleteUser(id) {
        try {
            const query = 'CALL DeleteUser(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Usuario eliminado con éxito");
            return { message: 'Usuario eliminado con éxito', results };
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }


    static async getUserById(id) {
        try {
            const query = 'CALL GetUserById(?)';
            const [results] = await pool.query(query, [id]);
            console.log("Consulta de usuario por ID ejecutada");
            return results[0][0]; 
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw error;
        }
    }

    static async verifyUserCredentials(email, password) {
        try {
            const query = 'CALL VerifyUserCredentials(?, ?)';
            const [results] = await pool.query(query, [email, password]);
            console.log("Credenciales de usuario verificadas");
            if (results[0].length > 0) {
                return results[0][0]; 
            } else {
                throw new Error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error("Error al verificar las credenciales:", error);
            throw error;
        }
    }
}

module.exports = Usuarios;
