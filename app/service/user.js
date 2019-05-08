const Service = require('egg').Service;

class UserService extends Service {
  async findById(id) {
    try {
      const item = await this.ctx.model.User.findById(id);
      return item;
    } catch(e) {
      return e;
    }
  }
  async create(values) {
    try {
      await this.ctx.model.User.create(values);
      return 'create OK!';
    } catch(e) {
      return e;
    }
  }
  async findOne(values) {
    try {
      const result = await this.ctx.model.User.findOne(values);
      return result;
    } catch(e) {
      return e;
    }
  }
  async findAll(values) {
    try {
      const result = await this.ctx.model.User.findAll(values);
      return result;
    } catch(e) {
      return e;
    }
  }
  async update(values, options) {
    try {
      await this.ctx.model.User.update(values, options);
      return result;
    } catch(e) {
      return e;
    }
  }
}

module.exports = UserService;