const { DataTypes } = require("sequelize");
const db = require("../db/database");


//define structure table
const movement=db.define('movements',{

    concept:{
        type:DataTypes.STRING
    },
    amount:{
        type:DataTypes.INTEGER
    },
    date:{
        type:DataTypes.DATE
    },
    type:{
       
          type:DataTypes.STRING
        
    }
}, {
    timestamps: false
  })
module.exports=movement