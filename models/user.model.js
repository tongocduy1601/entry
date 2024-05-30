const pool = require("../config/dbconfig");

class User {
  connection = pool;
  constructor(user) {
    this.loginId = user.loginId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.email = user.email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.role = user.role;
  }

  static async create(user) {
    try {
      await pool.query("INSERT INTO `user` SET ?", [user]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async read() {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(logindid, user) {
    try {
      const query = "UPDATE user SET ? WHERE loginId = ?";
      await pool.query(query, [user, logindid]);
      //  await pool.execute("UPDATE user SET ? WHERE logindid = ?", [user, id]);
      return true; // or you can return any meaningful value indicating success
    } catch (error) {
      throw error;
    }
  }

  static async delete(loginId) {
    try {
      await pool.execute("DELETE FROM user WHERE loginId = ?", [loginId]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const [users] = await pool.execute("SELECT * FROM user");
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async getUserByLoginId(loginId) {
    try {
      const [users] = await pool.execute(
        "SELECT * FROM user WHERE loginId = ?",
        [loginId]
      );
      return users[0];
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(id) {
    try {
      const [user] = await pool.execute("SELECT * FROM user WHERE id = ?", [
        id,
      ]);
      console.log(user);
      return user[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
