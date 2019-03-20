/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551152721144_6288';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    domainWhiteList: [ 'localhost:3006' ],
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    credentials: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.static = {
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, 'app/public/image'),
      path.join(appInfo.baseDir, 'app/public/video/amusement'),
      path.join(appInfo.baseDir, 'app/public/video/sports'),
    ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
