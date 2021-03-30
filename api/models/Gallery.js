"use strict"

//const { DataTypes } = require("sequelize/types")

module.exports=(sequelize,DataTypes)=>{
    const Gallery = sequelize.define(
        'Gallery',{
            pathResource:{
                type: DataTypes.STRING,
                allowNull: false,
                unique:false,
            },
            keyResource:{
                type:DataTypes.STRING,
                allowNull: false,
                unique:true,
            }
        },
        {
            tableName:"Gallery"
        }
            );

    return Gallery;
}