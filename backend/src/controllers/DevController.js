const axios = require('axios');
const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../config/websocket');

const ArrayUtils = require('../utils/ArrayUtils');
const GithubService = require('../services/GithubService');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { githubUsername, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ githubUsername });

    if (!dev) {
      const { name = login, avatar_url: avatarUrl, bio } = await GithubService.getUser(githubUsername);

      const techsAsArray = ArrayUtils.stringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        name,
        githubUsername,
        avatarUrl,
        bio,
        techs: techsAsArray,
        location
      });

      const devsToSendMessageTo = findConnections({ latitude, longitude }, techsAsArray);
      console.log(devsToSendMessageTo);

      sendMessage(devsToSendMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  }
};
