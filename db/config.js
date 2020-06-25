require("dotenv").config();

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const insertString =
  "INSERT INTO covid_observations(observation_date, country, confirmed, deaths, recovered) VALUES($1, $2, $3, $4, $5) RETURNING *";
const selectString =
  "SELECT country, SUM(confirmed) as confirmed, SUM(deaths) as deaths, SUM(recovered) as recovered FROM covid_observations WHERE observation_date=to_date($1,'YYYY-MM-DD') GROUP BY country ORDER BY confirmed DESC LIMIT $2";
const dropTableString = "DROP TABLE covid_observations";
const createTableString =
  "CREATE TABLE covid_observations (id SERIAL PRIMARY KEY, observation_date DATE, country VARCHAR(50), confirmed integer, deaths integer, recovered integer);";

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

module.exports = {
  pool,
  insertString,
  selectString,
  dropTableString,
  createTableString,
};
