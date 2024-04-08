import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    allowExitOnIdle: true,
});

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Base de datos conectada:', result.rows[0].now);
    } catch (error) {
        console.error('Error:', error);
    }
})();