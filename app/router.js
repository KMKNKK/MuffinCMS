'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/getVideoList/videoDetails', controller.getVideoList.getDetail);
  router.get('/getVideoList/videoOccupancy', controller.getVideoList.getVideoOccupancy);
  router.get('/getVideoList/getPV', controller.getVideoList.getPV);
  router.get('/getVideoList', controller.getVideoList.getVideoList);
  router.get('/getVideoList/searchVideo', controller.getVideoList.searchVideo);

  router.post('/uploadVideo', controller.uploadVideo.upload);
  router.post('/deleteVideo', controller.deleteVideo.delete);

  router.post('/modifyVideo/alterProportion', controller.modifyVideo.alterProportion);
  router.post('/modifyVideo/alterFPS', controller.modifyVideo.alterFPS);
  router.post('/modifyVideo/compressionVideo', controller.modifyVideo.compressionVideo);

  router.post('/user/addItem', controller.user.addItem);
  router.post('/user/selectItemById', controller.user.selectItemById);
  router.post('/user/confirmAccount', controller.user.confirmAccount);
  router.post('/user/changeUserAuth', controller.user.changeUserAuth);
  router.get('/user/getUserList', controller.user.getUserList);
  router.post('/user/changeUserPassword', controller.user.changeUserPassword);
};
