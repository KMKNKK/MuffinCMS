'use strict';

const Controller = require('egg').Controller;

class RecordController extends Controller {
  async addItem() {
    const { broswer, ip } = this.ctx.query;
    this.ctx.body = await this.ctx.service.record.create({ broswer, ip });
  }
 
  async getRecordList() {
    const list = await this.ctx.service.record.findAll();
    this.ctx.body = {
      err: 10001,
      msg: {
        list
      },
    }
  }
}

module.exports = RecordController;