const task = require("./task");

module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Reports', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [4, 20],
            validate: {
                notEmpty: { msg: "Name cannot be empty" }
            }
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reportContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reportSammary: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        ,
        reportDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

    });

    return Report;
}