const axios = require('axios');
const Dev = require('../models/Dev');
const ArrayUtils = require('../utils/ArrayUtils');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { githubUsername, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ githubUsername });

    if (!dev) {
      const githubResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);

      const { name = login, avatar_url: avatarUrl, bio } = githubResponse.data;

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
    }

    return res.json(dev);
  }
};
