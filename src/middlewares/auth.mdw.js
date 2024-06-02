const httpStatus = require("http-status");
const { UserService } = require("../modules/user");
const { tokenService } = require("../modules/authen");

module.exports = (requiredRoles) => (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userService = UserService;
      const token = tokenService.getAccessToken(req);
      const decoded = tokenService.getPayloadFromToken(token);
      if (!!requiredRoles) {
        const user = await userService.getUserByLoginId(decoded.loginId);
        if (!user) {
          reject();
        }
        let forbidden = true;
        if (requiredRoles.includes(user.role)) {
          forbidden = false;
        }
        if (forbidden) return res.status(httpStatus.FORBIDDEN);
      }
    } catch (err) {
      reject(err);
    }
    resolve();
  })
    .then(() => next())
    .catch(async (err) => {
      if (err.name === "TokenExpiredError") {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send("Access Denied: Token expired");
      }
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send(`Access Denied :${err.name}`);
    });
};
