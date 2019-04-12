/**
 * @Doc 获取视频信息列表
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const Controller = require('egg').Controller;

const fatherList = require('../constant/categories').videoCategory;

class getVideoListController extends Controller {

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
   * @Des 增加pv
   */
  addPV() {
    const path = this.getPath('txt', 'pvCount.txt');
    const buffer = fs.readFileSync(path);
    const buffer2Obj = JSON.parse(buffer.toString());
    const nowDate = new Date().toLocaleDateString();
    if (buffer2Obj[nowDate] === undefined) {
      buffer2Obj[nowDate] = 1;
    } else {
      buffer2Obj[nowDate] = buffer2Obj[nowDate] + 1;
    }
    fs.writeFileSync(path, JSON.stringify(buffer2Obj));
  }

  async getVideoList() {
    const { ctx } = this;
    const dirPath = ctx.query.dirPath;
    let body;

    // 统计此次访问的PV
    this.addPV();

    // 若无query，则返回所有视频List
    if (dirPath === undefined) {
      if (!fatherList) {
        console.log('getVideoList-fatherList-err', fatherList);
        body = {
          err: 10002,
          msg: 'fail: No fatherList'
        };
      } else {
        const allVideo = {};
        let curTargetPath;
        let curVideoList;
        fatherList.forEach(element => {
          curTargetPath = path.join(this.config.baseDir, 'app/public/video', element);
          try {
            curVideoList = fs.readdirSync(curTargetPath);
            allVideo[element] = curVideoList;
          } catch (err) {
            console.log(`getVideoList-${element}-err`, err);
            body = {
              err: 10002,
              msg: `fail: get ${element}List error`
            };
          }
        });
        body = {
          err: 10001,
          msg: allVideo
        };
      }
    } else {
      // 有query则按需返回对应分类的视频List
      const targetPath = path.join(this.config.baseDir, 'app/public/video', dirPath);
      try {
        const videoList = fs.readdirSync(targetPath);
        body = videoList;
      } catch (err) {
        console.log(`getVideoList-${dirPath}-err`, err);
        body = {
          err: 10002,
          msg: `fail: get ${dirPath}List error`
        };
      }
    }
    ctx.body = body;
  }

  /**
   * @Des 获取视频详细信息
   * @param {string} fileType 文件类别(所在文件夹)
   * @param {string} fileName 文件名
   */
  async getDetail() {
    const { ctx: { query } } = this;
    const { fileType = 'video/sports', fileName } = query;
    if (!fileName) {
      this.ctx.body = {
        err: 10002,
        msg: 'fail: Missing params',
      };
    } else {
      const path = this.getPath(fileType, fileName);
      // 查看视频信息

      const Pro = new Promise((resolve, reject) => {
        ffmpeg.ffprobe(path, (err, meta) => {
          if (err) {
            console.log(`get-${path}-msg-err`, err);
            reject();
          }
          resolve(meta);
        });
      }).then(val => val);

      const res = await Pro;

      this.ctx.body = {
        err: 10001,
        msg: res,
      };
    }
  }

  /**
   * @Des 获取所有视频占的存储空间
   */
  async getVideoOccupancy() {
    let body;
    if (!fatherList) {
      console.log('getVideoList-fatherList-err', fatherList);
      body = {
        err: 10002,
        msg: 'fail: No fatherList'
      };
    } else {
      let curTargetPath;
      let curVideoList;
      let curFilePath;
      let count = 0;
      fatherList.forEach(element => {
        curTargetPath = path.join(this.config.baseDir, 'app/public/video', element);
        try {
          curVideoList = fs.readdirSync(curTargetPath);
          curVideoList.forEach(val => {
            curFilePath = path.join(curTargetPath, val);
            count += fs.statSync(curFilePath).size;
          })
          body = {
            err: 10001,
            msg: Math.round(count / 1024 / 1024),
          };
        } catch (err) {
          console.log(`getVideoOccupancy-${element}-err`, err);
          body = {
            err: 10002,
            msg: `fail: get ${element}-countSize error`
          };
        }
      });
    }
    this.ctx.body = body;
  }

   /**
   * @Des 获取PV(页面访问次数)
   */
  async getPV() {
    const path = this.getPath('txt', 'pvCount.txt');
    const buffer = fs.readFileSync(path);
    const buffer2Obj = JSON.parse(buffer.toString());
    const obj2Arr = Object.keys(buffer2Obj);
    let result = [];
    for (let i = obj2Arr.length - 1, j = 0; j < 7; i--, j++) {
      result.unshift(buffer2Obj[obj2Arr[i]])
    }
    this.ctx.body = {
      err: 10001,
      msg: result,
    }
  }
}

module.exports = getVideoListController;
