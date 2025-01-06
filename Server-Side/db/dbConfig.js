const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tashikka', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate().then(() => {
  console.log("Connected to Database")
}).catch((err) => { console.log("Failed to connect database", err) })
module.exports =  sequelize ;
