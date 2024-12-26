const { Sequelize } = require("sequelize");
const { Media } = require("../models/media");

// Paginate and filter media data
const paginateData = async (type, search, page, limit) => {
  const query = {};

  if (type) query.type = type;
  if (search) query.url = { [Sequelize.Op.like]: `%${search}%` };

  const data = await Media.findAndCountAll({
    where: query,
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });

  return {
    totalItems: data.count,
    totalPages: Math.ceil(data.count / limit),
    currentPage: page,
    data: data.rows,
  };
};

module.exports = { paginateData };
