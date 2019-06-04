'use strict';

const Controller = require('egg').Controller;

class FeedbackController extends Controller {
  async addItem() {
    const { type, words } = this.ctx.query;
    this.ctx.body = await this.ctx.service.feedback.create({ type, words });
  }
 
  async getList() {
    const announcement = await this.ctx.service.feedback.findAll({ where: { type: 'announcement' } });
    const feedback = await this.ctx.service.feedback.findAll({ where: { type: 'feedback' } });
    this.ctx.body = {
      err: 10001,
      msg: {
        announcement,
        feedback
      },
    }
  }
}

module.exports = FeedbackController;