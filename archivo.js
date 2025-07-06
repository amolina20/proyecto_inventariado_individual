const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('ERROR: La variable de entorno DATABASE_URL no está definida.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
});

async function mostrarContactos() {
  try {
    // Consulta todos los registros de la tabla contactos
    const res = await pool.query('SELECT * FROM contactos LIMIT 10'); // limite para no saturar
    console.log('Contactos en la base de datos:');
    console.table(res.rows); // muestra la tabla en consola
  } catch (error) {
    console.error('Error al consultar contactos:', error.message);
  } finally {
    await pool.end();
  }
}

mostrarContactos();
