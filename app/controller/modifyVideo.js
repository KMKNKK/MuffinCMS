/**
 * @Doc 修改视频(转码/视频流处理)
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const Controller = require('egg').Controller;

class ModifyVideoController extends Controller {

  /**
   * @Des 获取视频对应地址
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   * @return {string} 输出对应地址
   */
  getPath(fileType, fileName) {
    const resultPath = path.join(this.config.baseDir, 'app/public', fileType, fileName);
    return resultPath;
  }

  /**
   * @Des 修改视频宽高比
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   * @param {string} outName 输出视频名, 若没有则修改原视频
   * @param {string} heightWidth 视频宽高比
   */
  async alterProportion() {
    const { ctx: { query } } = this;
    const { heightWidth, fileType = 'video/sports', fileName, outName } = query;

    if (!heightWidth || !fileName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const targetPath = this.getPath(fileType, fileName);
      const outPath = outName ? this.getPath(fileType, outName) : this.getPath(fileType, '(1)' + fileName);
      const targetFile = ffmpeg(targetPath);

      try {
        targetFile.withSize(`${heightWidth}`)
          .save(outPath)
          .on('end', function() {
            console.log('alterProportion succesfully');
          })
          .on('error', function(err) {
            console.log('an error happened: ' + err.message);
          });
      } catch (e) {
        console.log('modifyVideo-alterProportion-error', e);
      }
      this.ctx.body = {
        err: 10001,
        msg: 'success alter proportion!',
      };
    }
  }

  /**
   * @Des 修改视频帧率
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   * @param {string} outName 输出视频名, 若没有则修改原视频
   * @param {number} fps 视频速率
   */
  async alterFPS() {
    const { ctx: { query } } = this;
    const { fps, fileName, fileType = 'video/sports', outName } = query;

    if (!fps || !fileName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const targetPath = this.getPath(fileType, fileName);
      const outPath = outName ? this.getPath(fileType, outName) : this.getPath(fileType, '(1)' + fileName);
      const targetFile = ffmpeg(targetPath);

      try {
        targetFile.fps(fps)
          .save(outPath)
          .on('end', function() {
            console.log('alterFPS succesfully');
          })
          .on('error', function(err) {
            console.log('an error happened: ' + err.message);
          });
      } catch (e) {
        console.log('modifyVideo-alterFPS-error', e);
      }
      this.ctx.body = {
        err: 10001,
        msg: 'success alter FPS!',
      };
    }
  }

  /**
   * @Des 压缩视频
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   * @param {string} outName 输出视频名, 若没有则修改原视频
   * @param {number} size 压缩比例
   */
  async compressionVideo() {
    const { ctx: { query } } = this;
    const { size, fileName, fileType = 'video/sports', outName } = query;

    if (!size || !fileName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const targetPath = this.getPath(fileType, fileName);
      const outPath = outName ? this.getPath(fileType, outName) : this.getPath(fileType, '(1)' + fileName);
      const targetFile = ffmpeg(targetPath);

      try {
        targetFile.size(`${size}%`)
          .save(outPath)
          .on('end', function() {
            console.log('compressionVideo succesfully');
          })
          .on('error', function(err) {
            console.log('an error happened: ' + err.message);
          });
      } catch (e) {
        console.log('modifyVideo-compressionVideo-error', e);
      }
      this.ctx.body = {
        err: 10001,
        msg: 'success compression video!',
      };
    }
  }
}

module.exports = ModifyVideoController;
