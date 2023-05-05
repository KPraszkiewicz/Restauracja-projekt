const amongus = require("mongoose");
const config = require("./../config/db_config")

amongus.connect(config.conn)
amongus.set('strictQuery', true);

module.exports = amongus