const axios = require('axios');

module.exports = {
  async getUser(user) {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);

    return data;
  }
}
