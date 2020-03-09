module.exports = {
  stringAsArray(string) {
    return string.split(",").map(t => t.trim());
  }
}
