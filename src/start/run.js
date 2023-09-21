const config = require("config");
const port = config.get("port");
const sequelize = require("../database/index");

const bootstrapt = async (app) => {
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({ alter: true, logging: false });
  app.listen(port, () => {
    console.log(
      `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
    );
    console.log(`                             Listening on ${port}`);
    console.log(
      `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
    );
  });
  require('./swagger')(app);
};

module.exports = bootstrapt;
