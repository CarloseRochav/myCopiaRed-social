"use strict"

//const { DataTypes } = require("sequelize/types")

module.exports=(sequelize,DataTypes)=>{
    const Gallery = sequelize.define(
        'Gallery',{
            mediaResource:{
                type: DataTypes.STRING,
                allowNull: false,
                unique:false,
            }
        },
        {
            tableName:"Gallery"
        }
    );


    return Gallery;
}