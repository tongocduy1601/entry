const Joi = require("joi");

class UserSchemas {
  constructor() {
    this.Create = Joi.object({
      loginId: Joi.string().min(6).required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    this.Update = Joi.object({
      loginId: Joi.string().min(6).required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
    });

    this.Delete = Joi.object({
      logindId: Joi.string().required(),
    });

    this.Login = Joi.object({
      loginId: Joi.string().required(),
      password: Joi.string().required(),
    });
  }
}

module.exports = new UserSchemas();
