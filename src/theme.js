const { join } = require("path");

module.exports = function theme() {
  return {
    name: "snout",

    getThemePath() {
      return join(__dirname, "theme");
    },

    getClientModules() {
      return [join(__dirname, "theme/main.css")];
    },
  };
};
