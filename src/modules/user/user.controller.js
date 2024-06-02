const userService = require("./user.service");

const UserController = {
  async updateUser(req, res, next) {
    try {
      const { loginId, email, firstName, lastName } = req.body;
      const user = await userService.updateUser(
        loginId,
        email,
        firstName,
        lastName
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { loginId } = req.body;
      await userService.deleteUser(loginId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },

  async createUser(req, res, next) {
    try {
      const { loginId, password, email, firstName, lastName } = req.body;
      await userService.createUser(
        loginId,
        password,
        email,
        firstName,
        lastName
      );
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { loginId, password } = req.body;
      const user = await userService.login(loginId, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
