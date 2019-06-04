'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Record = app.model.define('records', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    broswer: STRING(30),
    ip: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return Record;
};