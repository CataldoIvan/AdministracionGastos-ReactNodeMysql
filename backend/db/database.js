
//conexion with DB
const {Sequelize}=require("sequelize")
const db = new Sequelize('presupuestosemanal', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports=db