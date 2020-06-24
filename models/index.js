const userModel = require('./user')
const tripModel = require('./trips.js');
const tokenBlacklistModel = require('./token-blacklist')
module.exports = { tripModel, userModel, tokenBlacklistModel }