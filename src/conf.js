require("dotenv").config();
const apiSite = process.env.REACT_APP_LOCALHOST || "find_the_address";
module.exports = { apiSite };