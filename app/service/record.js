const Service = require('egg').Service;

class RecordService extends Service {
  async create(values) {
    try {
      await this.ctx.model.Record.create(values);
      return 'create OK!';
    } catch(e) {
      return e;
    }
  }
  async findAll(values) {
    try {
      const result = await this.ctx.model.Record.findAll(values);
      return result;
    } catch(e) {
      return e;
    }
  }
}

module.exports = RecordService;