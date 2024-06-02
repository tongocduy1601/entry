const { ApiError, ROLE, USER_CONSTANT } = require("../../utils");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const saltRounds = 10;
const { tokenService } = require("../../modules/authen");
const userRepository = require("./user.repository");

const UserService = {
  async createUser(loginId, password, email, firstName, lastName) {
    try {
      const newUser = {
        loginId,
        email,
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: ROLE.USER,
      };
      const loginIdExist = await userRepository.getUserByLoginId(loginId);
      if (loginIdExist) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          USER_CONSTANT.LOGIN_ID_EXIST
        );
      }
      newUser.password = bcrypt.hashSync(password, saltRounds);
      await userRepository.create(newUser);
      return true;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(loginId) {
    try {
      const result = await userRepository.delete(loginId);

      return result;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        USER_CONSTANT.FAILD_TO_DELETE
      );
    }
  },

  async getAllUsers() {
    try {
      const users = await userRepository.getAllUser();
      return users;
    } catch (error) {
      throw error;
    }
  },

  async getUserByLoginId(loginId) {
    try {
      const user = await userRepository.getUserByLoginId(loginId);
      if (!user) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          USER_CONSTANT.FAILD_TO_GET_BY_LOGIN_ID
        );
      }
      return user;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        USER_CONSTANT.FAILD_TO_GET_BY_ID
      );
    }
  },

  async updateUser(loginId, email, firstName, lastName) {
    try {
      let user = await userRepository.getUserByLoginId(loginId);
      if (!user) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          USER_CONSTANT.FAILD_TO_GET_BY_ID
        );
      }
      user.loginId = loginId ?? user.loginId;
      user.email = email ?? user.email;
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      await userRepository.update(loginId, user);
      user = await userRepository.getUserByLoginId(loginId);
      return user;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update user"
      );
    }
  },

  async login(loginId, password) {
    try {
      const user = await userRepository.getUserByLoginId(loginId);
      if (!user) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          USER_CONSTANT.FAILD_TO_GET_BY_ID
        );
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED);
      }
      const accessToken = tokenService.generateAccessToken(
        user.loginId,
        user.role
      );
      user.accessToken = accessToken;
      delete user.password;
      return user;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Login failed");
    }
  },
};
module.exports = UserService;
