import mysql from "mysql2";
import fs from "fs"

// const db = mysql.createConnection({
//   host: "makemates-arush3339-4b72.l.aivencloud.com",
//   user: "avnadmin",
//   password: "password",
//   database: "AVNS_j7EMwV3KqDI1nxAIBxT",
//   port : 20439,
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "archer",
  password: "password",
  database: "makemates",
});


db.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

export default db;
