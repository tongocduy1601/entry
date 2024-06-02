const jwt = require("jsonwebtoken");
const { ApiError, TOKEN_CONSTANT } = require("../../utils");
const httpStatus = require("http-status");
const tokenSecret = process.env.TOKEN_SECRET;
const AuthService = {
  getAccessToken(req) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    const token = authorization.split(" ")[1];
    return token;
  },

  getRefreshToken(req) {
    const refreshToken = req.header("refresh-token");
    return refreshToken;
  },

  getPayloadFromToken(token) {
    const decoded = jwt.verify(token, tokenSecret);
    return decoded;
  },

  getPayloadFromRequest(req) {
    const token = this.getAccessToken(req);
    const decoded = jwt.verify(token, tokenSecret);
    return decoded;
  },

  generateAccessToken(id, role) {
    const payload = {
      loginId: id,
      role: role,
    };
    const accessToken = jwt.sign(payload, tokenSecret, {
      expiresIn: TOKEN_CONSTANT.expiresIn,
    });
    return accessToken;
  },
};

module.exports = AuthService;
