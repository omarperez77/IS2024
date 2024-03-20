import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM empleado ORDER BY id_empleado ASC");
    return rows;
};

// Función para buscar un empleado por su ID
const getEmployeeById = async (id) => {
    try {
        const query = 'SELECT * FROM empleado WHERE id_empleado = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
     } catch (error){
        throw error;
     } 
};

const createEmployee = async (id_departamento, nombre, sueldo) => {
    try {
        const query = 'INSERT INTO empleado (id_departamento, nombre, sueldo) VALUES ($1, $2, $3) RETURNING *';
        const values = [id_departamento, nombre, sueldo];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateEmployee = async (id, nombre, id_departamento, sueldo) => {
    try {
        const query = 'UPDATE empleado SET nombre = $1, id_departamento = $2, sueldo = $3 WHERE id_empleado = $4 RETURNING *';
        const values = [nombre, id_departamento, sueldo, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteEmployee = async (id) => {
    try {
        const query = 'DELETE FROM empleado WHERE id_empleado = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para mostrar los empleados que laboran en un departamento
const getDepartmentByIdEmployee = async (id) => {
    try {
        const query = 'SELECT d.nombre,e.id_empleado FROM empleado e INNER JOIN departamento d ON d.id_departamento = e.id_departamento WHERE id_empleado = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
     } catch (error){
        throw error;
     } 
};

export const employeesModel = {
    findAll, 
    getEmployeeById,
    createEmployee, 
    updateEmployee,
    deleteEmployee,
    getDepartmentByIdEmployee,
};