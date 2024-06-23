import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "instagram",
  password: "Rohit@12345",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database.");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM folowers";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error inside server" });
    }
    return res.json(result);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO folowers (id, username, email) VALUES (?, ?, ?)";
  const values = [req.body.id, req.body.username, req.body.email];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json(err);
    }
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM folowers WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error inside server" });
    }
    console.log(result[0]);
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE folowers SET `username` = ?, `email`= ? WHERE id = ?";
  const id = req.params.id;
  const values = [req.body.username, req.body.email, id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error inside server" });
    }
    console.log(result);
    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM folowers WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error inside server" });
    }

    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
