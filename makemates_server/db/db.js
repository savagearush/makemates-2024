import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Arush@123",
  database: "makemates",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

export default db;
