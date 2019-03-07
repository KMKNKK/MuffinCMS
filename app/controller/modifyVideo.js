/**
 * @Doc 修改视频(转码/视频流处理)
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class ModifyVideoController extends Controller {

  async transcoding() {
    // TODO 转码
  }
  async streamProcessing() {
    // TODO 流处理
  }
}

module.exports = ModifyVideoController;
