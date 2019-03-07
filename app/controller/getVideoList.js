/**
 * @Doc 获取视频信息列表
 * @author Muffinfish<muffinzkun@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

const fatherList = require('../constant/categories').videoCategory;

class getVideoListController extends Controller {
  async get() {
    const { ctx } = this;
    const dirPath = ctx.query.dirPath;
    let body;

    // 若无query，则返回所有视频List
    if (dirPath === undefined) {
      if (!fatherList) {
        console.log('getVideoList-fatherList-err', fatherList);
        body = 'fail: No fatherList';
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
            body = `fail: get ${element}List error`;
          }
        });
        body = allVideo;
      }
    } else {
      // 有query则按需返回对应分类的视频List
      const targetPath = path.join(this.config.baseDir, 'app/public/video', dirPath);
      try {
        const videoList = fs.readdirSync(targetPath);
        body = videoList;
      } catch (err) {
        console.log(`getVideoList-${dirPath}-err`, err);
        body = `fail: get ${dirPath}List error`;
      }
    }
    ctx.body = body;
  }
}

module.exports = getVideoListController;
