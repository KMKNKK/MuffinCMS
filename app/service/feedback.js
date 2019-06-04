const Service = require('egg').Service;

class FeedbackService extends Service {
  async create(values) {
    try {
      await this.ctx.model.Feedback.create(values);
      return 'create OK!';
    } catch(e) {
      return e;
    }
  }
  async findAll(values) {
    try {
      const result = await this.ctx.model.Feedback.findAll(values);
      return result;
    } catch(e) {
      return e;
    }
  }
}

module.exports = FeedbackService;