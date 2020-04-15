require("dotenv").config();

let CONFIG = {};
CONFIG.apiSite = process.env.REACT_APP_LOCALHOST;
module.exports = CONFIG;