var EntitySchema = require("typeorm").EntitySchema;

const UserEntity = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    loginId: {
      name: "loginid",
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
    role: {
      type: "varchar",
    },
    createdAt: {
      createDate: true,
    },
    updatedAt: {
      updateDate: true,
    },
  },
});

module.exports = UserEntity;
