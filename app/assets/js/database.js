"use server";
import mysql from "mysql";

let pool;

export async function connect() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.dbhost,
      user: process.env.dbuser,
      password: process.env.dbpass,
      database: process.env.dbname,
      port: process.env.dbport,
    });
  }

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection failed: " + err.stack);
        return reject(err);
      }
      resolve(connection);
    });
  });
}

export async function query(sql, params) {
  return new Promise((resolve, reject) => {
    connect()
      .then((connection) => {
        connection.query(sql, params, (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      })
      .catch(reject);
  });
}
