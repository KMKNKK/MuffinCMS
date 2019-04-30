const Service = require('egg').Service;

class UserService extends Service {
  async findById(id) {
    try {
      const item = await this.ctx.model.User.findById(id);
      return item;
    } catch(e) {
      return e.errors[0].message;
    }
  }
  async create(values) {
    try {
      await this.ctx.model.User.create(values);
      return 'create OK!';
    } catch(e) {
      return e.errors[0].message;
    }
  }
  async findOne(values) {
    try {
      const result = await this.ctx.model.User.findOne(values);
      return result;
    } catch(e) {
      return e.errors[0].message;
    }
  }
}

module.exports = UserService;