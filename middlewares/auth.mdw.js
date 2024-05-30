const httpStatus = require("http-status");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service.js");

module.exports = (requiredRoles) => (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      return res.status(httpStatus.UNAUTHORIZED);
    });
};
