"use strict";

module.exports = (sequelize, DataTypes) => {
    const Reaccions = sequelize.define(
        "Reaccions",
        {
            reaccion: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false,
            },
        },
        {
            tableName: "Reaccions",
        }
    );
    return Reaccions;
};