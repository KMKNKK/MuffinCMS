'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Feedback = app.model.define('feedbacks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: STRING(30),
    words: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return Feedback;
};