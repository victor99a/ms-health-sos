const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { 
      rejectUnauthorized: false 
    }
  },
  searchPath: ['public'],
  pool: { min: 2, max: 10 }
});

db.raw('SELECT 1')
  .then(() => console.log('Conexion a PostgreSQL (Supabase) exitosa con Knex'))
  .catch((err) => {
    console.error('Error conectando a la BD:', err.message);
    if(err.code) console.error('Codigo de error:', err.code);
  });

module.exports = db;