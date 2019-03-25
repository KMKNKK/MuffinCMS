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
   * @Des 获取视频详细信息
   * @param {string} path 视频地址
   */
  getDetail(path) {
    // 查看视频信息
    ffmpeg.ffprobe(path, (err, meta) => {
      if (err) {
        console.log(`get-${path}-msg-err`, err);
      }
      console.log('meta', meta);
    });

  }

  async transcoding() {
    // TODO 转码
  }
  async streamProcessing() {
    // TODO 流处理
  }

  /**
   * @Des 修改视频宽高比
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   * @param {string} outName 输出视频名, 若没有则修改原视频
   * @param {number} width 视频宽
   * @param {number} height 视频高
   */
  async alterProportion() {
    const { ctx: { query } } = this;
    const { width, height, fileType = 'video/sports', fileName, outName } = query;

    if (!width || !height || !fileName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const targetPath = this.getPath(fileType, fileName);
      const outPath = outName ? this.getPath(fileType, outName) : targetPath;
      const targetFile = ffmpeg(targetPath);

      try {
        targetFile.withSize(`${width}x${height}`)
          .save(outPath)
          .on('end', function() {
            console.log('file has been converted succesfully');
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

    if (!fps || !outName || !fileName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const targetPath = this.getPath(fileType, fileName);
      const outPath = outName ? this.getPath(fileType, outName) : targetPath;
      const targetFile = ffmpeg(targetPath);

      try {
        targetFile.fps(fps)
          .save(outPath)
          .on('end', function() {
            console.log('file has been converted succesfully');
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
}

module.exports = ModifyVideoController;
