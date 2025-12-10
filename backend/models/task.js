const e = require("express")
const manager = require("./manager")

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "tasks",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "pending",
                enum: ["pending", "in-progress", "completed"]
            },
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            managerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date:{
                type: DataTypes.DATE,
                allowNull:false,
                defaultValue:DataTypes.NOW
            }
        }

    )
    return Task;
}