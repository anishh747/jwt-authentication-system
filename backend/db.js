import pg from 'pg'

const Pool = pg.Pool;
const pool = new Pool({
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "auth_system"
});

export {pool};