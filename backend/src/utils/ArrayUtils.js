module.exports = {
  stringAsArray(string) {
    console.log(string);
    return string.split(",").map(t => t.trim());
  }
}
