/**
 * @Doc 删除视频
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class DeleteVideoController extends Controller {

  /**
   * @Des 删除视频文件
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   */
  async delete() {
    const { ctx } = this;
    const fileType = ctx.query.fileType || 'video/sports';
    const fileName = ctx.query.fileName;

    const target = path.join(this.config.baseDir, 'app/public', fileType, fileName);
    try {
      fs.unlinkSync(target);
      console.log(`已成功删除${target}`);
      this.ctx.body = {
        err: 10001,
        msg: 'success',
      };
    } catch (err) {
      console.log(`删除${target}出错：${err}`);
      this.ctx.body = {
        err: 10002,
        msg: 'fail',
      };
      // 处理错误
    }
  }
}

module.exports = DeleteVideoController;
