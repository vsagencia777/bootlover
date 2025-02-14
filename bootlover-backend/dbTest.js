require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "host.docker.internal",
    user: process.env.DB_USER || "bootlover_user",
    password: process.env.DB_PASSWORD || "senhaSegura123",
    database: process.env.DB_NAME || "bootlover_db",
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err);
    } else {
        console.log("Conexão com o banco de dados bem-sucedida!");
    }
    release();
    process.exit();
});

