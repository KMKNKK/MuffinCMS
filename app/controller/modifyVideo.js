/**
 * @Doc 修改视频(转码/视频流处理)
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const Controller = require('egg').Controller;

class ModifyVideoController extends Controller {

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

    if (!width || !height) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: No width or height',
      };
    } else {
      const targetPath = path.join(this.config.baseDir, 'app/public', fileType, fileName);
      const outPath = outName ? path.join(this.config.baseDir, 'app/public', fileType, outName) : targetPath;
      const targetFile = ffmpeg(targetPath);

      // 查看视频信息
      // ffmpeg.ffprobe(outPath, (err, meta) => {
      //   console.log('err', err);
      //   console.log('meta', meta);
      // });

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
   * @Des 合并两个视频
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} outName 输出视频名
   * @param {string} videoOne 视频一
   * @param {string} videoTwo 视频二
   */
  async mergeVideo() {
    const { ctx: { query } } = this;
    const { videoOne, videoTwo, fileType = 'video/sports', outName } = query;

    // TODO: 功能实现，代码简化

    if (!videoOne || !videoTwo || !outName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const targetOne = path.join(this.config.baseDir, 'app/public', fileType, videoOne);
      const targetTwo = path.join(this.config.baseDir, 'app/public', fileType, videoTwo);
      const outPath = path.join(this.config.baseDir, 'app/public', fileType, outName);
      const tempDir = path.join(this.config.baseDir, 'app/public', fileType, 'tempDir');
      ffmpeg(targetOne).input(targetTwo).mergeToFile(outPath);
      try {
        ffmpeg(targetOne)
          .input(targetTwo)
          .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
          })
          .on('end', function() {
            console.log('Merging finished !');
          })
          .mergeToFile(outPath, tempDir);
      } catch (e) {
        console.log('modifyVideo-mergeVideo-error', e);
      }
      this.ctx.body = {
        err: 10001,
        msg: 'success merge video!',
      };
    }
  }
}

module.exports = ModifyVideoController;
