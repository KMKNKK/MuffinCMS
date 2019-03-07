'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/getVideoList', controller.getVideoList.get);
  router.post('/uploadVideo', controller.uploadVideo.upload);
  router.post('/deleteVideo', controller.deleteVideo.delete);
};
