'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async addItem() {
    const { account, password, auth } = this.ctx.query;
    this.ctx.body = await this.ctx.service.user.create({ account, password, auth });
  }
  async selectItemById() {
    const { id } = this.ctx.query;
    this.ctx.body = await this.ctx.service.user.findById(id);
  }
  async confirmAccount() {
    const { account, password } = this.ctx.query;
    const confirmResult = await this.ctx.service.user.findOne({ where: { account, password } });
    if (confirmResult === null) {
      this.ctx.body = {
        err: 10002,
        msg: 'account or passport is wrong!',
      }
    } else {
      this.ctx.body = {
        err: 10001,
        msg: 'OK!',
        auth: confirmResult.auth,
      }
    }
  }
}

module.exports = UserController;