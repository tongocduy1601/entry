const { dataSource } = require("../../config");
//const pool = require("../../config/dbconfig");
const UserEntity = require("./user.model");
const userRepository = dataSource.getRepository(UserEntity);

module.exports = {
  create: async (user) => {
    try {
      await userRepository.save(user);
      return true;
    } catch (error) {
      throw error;
    }
  },
  update: async function (logindid, user) {
    try {
      await userRepository.update(logindid, user);
      return true;
    } catch (error) {
      throw error;
    }
  },
  delete: async function (loginId) {
    try {
      await userRepository.delete(loginId);
      return true;
    } catch (error) {
      throw error;
    }
  },
  getAllUser: async () => {
    try {
      const users = await userRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getUserByLoginId: async (loginId) => {
    try {
      const user = await userRepository.findOne({
        where: { loginId: loginId },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async function (id) {
    try {
      const user = userRepository.findOne(id);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
