const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const tokenSecret = process.env.TOKEN_SECRET;
const { TOKEN_CONSTANT } = require("../utils/constants");
class AuthService {
  static getAccessToken(req) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Access Denied");
    }
    const token = authorization.split(" ")[1];
    return token;
  }

  static getRefreshToken(req) {
    const refreshToken = req.header("refresh-token");
    return refreshToken;
  }

  static getPayloadFromToken(token) {
    const decoded = jwt.verify(token, tokenSecret);
    return decoded;
  }

  static getPayloadFromRequest(req) {
    const token = this.getAccessToken(req);
    const decoded = jwt.verify(token, tokenSecret);
    return decoded;
  }

  static generateAccessToken(id, role) {
    const payload = {
      loginId: id,
      role: role,
    };
    const accessToken = jwt.sign(payload, tokenSecret, {
      expiresIn: TOKEN_CONSTANT.expiresIn,
    });
    return accessToken;
  }
}

module.exports = AuthService;
