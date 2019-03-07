/**
 * @Doc 上传视频
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');

class UploadVideoController extends Controller {

  async upload() {
    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.filename); // 文件名
    const category = this.ctx.query.videoCategory === 'undefined' ? '' : this.ctx.query.videoCategory; // 视频类别
    const target = path.join(this.config.baseDir, 'app/public', category, filename); // 目标地址
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);

    this.ctx.body = { url: '/public/' + filename };
  }
}

module.exports = UploadVideoController;
