'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getVideoList/videoDetails', controller.getVideoList.getDetail);
  router.get('/getVideoList', controller.getVideoList.getVideoList);
  router.post('/uploadVideo', controller.uploadVideo.upload);
  router.post('/deleteVideo', controller.deleteVideo.delete);
  router.post('/modifyVideo/alterProportion', controller.modifyVideo.alterProportion);
  router.post('/modifyVideo/alterFPS', controller.modifyVideo.alterFPS);
  router.post('/modifyVideo/compressionVideo', controller.modifyVideo.compressionVideo);
};
