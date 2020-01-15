const Dev = require('../models/Dev');
const ArrayUtils = require('../utils/ArrayUtils');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsAsArray = ArrayUtils.stringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsAsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000,
        }
      }
    });

    return res.json({
      devs
    });
  }
}
