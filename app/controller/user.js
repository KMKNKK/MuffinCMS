'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async addItem() {
    const { account, password, phoneNumber, auth } = this.ctx.query;
    this.ctx.body = await this.ctx.service.user.create({ account, password, auth, 'phone_number': phoneNumber });
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

  async getUserList() {
    const admin = await this.ctx.service.user.findAll({ where: { auth: 'admin' } });
    const guest = await this.ctx.service.user.findAll({ where: { auth: 'guest' } });
    this.ctx.body = {
      err: 10001,
      msg: {
        admin,
        guest,
      },
    }
  }

  async changeUserAuth() {
    const { name, doWhat } = this.ctx.query;
    if (doWhat === 'up') {
      await this.ctx.service.user.update({auth: 'admin'}, { where: { account: name }});
      this.ctx.body = {
        err: 10001,
        msg: 'OK!'
      }
    } else {
      await this.ctx.service.user.update({auth: 'guest'}, { where: { account: name }});
      this.ctx.body = {
        err: 10001,
        msg: 'OK!'
      }
    }
  }

  async changeUserPassword() {
    const { id, newPassword } = this.ctx.query;
    await this.ctx.service.user.update({password: newPassword}, { where: { id }});
    this.ctx.body = {
      err: 10001,
      msg: 'OK!'
    }
  }

  async deleteAccount() {
    const { account } = this.ctx.query;
    await this.ctx.service.user.destroy({ where: { account }});
    this.ctx.body = {
      err: 10001,
      msg: 'OK!'
    }
  }
}

module.exports = UserController;