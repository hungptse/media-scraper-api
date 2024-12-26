const { DataTypes, Sequelize, SqliteDialect } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: path.join(__dirname, "../sqlite", "media-scraper.sqlite"),
  host: "localhost",
  dialect: "sqlite",
  username: "root",
  password: "root",
  logging: false,
});

const Media = sequelize.define("Media", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sourceUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = { Media };
