const UserService = require("../services/user.service");
const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const authen = require("../middlewares/auth.mdw");
const validate = require("../middlewares/validate.mdw");
const userSchemas = require("../schemas/user.schema");
const { ROLE } = require("../utils/constants");
router.get(
  "/",
  authen(ROLE.ADMIN),
  asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  }),
  UserService.getAllUsers
);

router.post(
  "/login",
  validate(userSchemas.Login),
  asyncHandler(async (req, res) => {
    const { loginId, password } = req.body;
    const user = await UserService.login(loginId, password);
    res.status(200).json(user);
  })
);

router.post(
  "/",
  authen(ROLE.ADMIN),
  validate(userSchemas.Create),
  asyncHandler(async (req, res) => {
    const { loginId, password, email, firstName, lastName } = req.body;
    await UserService.createUser(
      loginId,
      password,
      email,
      firstName,
      lastName,
      password
    );
    res.status(201).json();
  })
);

router.put(
  "/",
  authen(ROLE.ADMIN),
  validate(userSchemas.Update),
  asyncHandler(async (req, res) => {
    const { loginId, email, firstName, lastName } = req.body;
    const user = await UserService.updateUser(
      loginId,
      email,
      firstName,
      lastName
    );
    res.status(200).json(user);
  })
);

router.delete(
  "/",
  authen(ROLE.ADMIN),
  asyncHandler(async (req, res) => {
    const { loginId } = req.body;
    await UserService.deleteUser(loginId);
    res.status(204).json();
  })
);

module.exports = router;
