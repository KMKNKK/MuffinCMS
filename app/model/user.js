'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    account: { type: STRING(30), primaryKey: true },
    password: STRING(30),
    created_at: DATE,
    updated_at: DATE,
    auth: STRING(30),
    phone_number: STRING(30),
  });

  return User;
};