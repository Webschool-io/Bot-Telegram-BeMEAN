'use strict';

module.exports = {
  service: require('./serviceHandler'),
  sticker: require('./stickerHandler'),
  location: require('./locationHandler'),
  command: require('./commandHandler'),
  message: require('./messageHandler')
};