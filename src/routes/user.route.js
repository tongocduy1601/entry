const { authen, validate } = require("../middlewares");
const userSchemas = require("../modules/user/user.schema");
const { ROLE, asyncHandler } = require("../utils");
const { UserController } = require("../modules/user");
const router = require("express").Router();
const userController = UserController;
router.post(
  "/login",
  validate(userSchemas.Login),
  asyncHandler(async (req, res, next) => {
    userController.login(req, res, next);
  })
);

router.post(
  "/",
  authen(ROLE.ADMIN),
  validate(userSchemas.Create),
  asyncHandler(async (req, res, next) => {
    userController.createUser(req, res, next);
  })
);

router.put(
  "/",
  authen(ROLE.ADMIN),
  validate(userSchemas.Update),
  asyncHandler(async (req, res, next) => {
    userController.updateUser(req, res, next);
  })
);

router.delete(
  "/",
  authen(ROLE.ADMIN),
  asyncHandler(async (req, res, next) => {
    userController.deleteUser(req, res, next);
  })
);

router.get(
  "/",
  authen(ROLE.ADMIN),
  asyncHandler(async (req, res, next) => {
    userController.getAllUsers(req, res, next);
  })
);

module.exports = router;
