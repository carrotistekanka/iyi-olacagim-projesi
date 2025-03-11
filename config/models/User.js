const db = require("../config/db");

class User {
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async createUser(name, email, password) {
    const [result] = await db.query(
      "INSERT INTO users (name, email, ) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result.insertId;
  }
}

module.exports = User;
