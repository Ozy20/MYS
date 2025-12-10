const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define('Managers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [4, 20],
            validate: {
                notEmpty: { msg: "Name cannot be empty" }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Password cannot be empty" },
                notContains: {
                    args: [' '],
                    msg: 'Password cannot contain spaces.'
                }
            }

        },
        numOfEmployees: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        }
    }
        ,
        {
            hooks: {
                beforeCreate: async (manager) => {
                    if (manager.password) {
                        const salt = await bcrypt.genSalt(10);
                        manager.password = await bcrypt.hash(manager.password, salt);
                    }
                }
            }
        }
    );

    return Manager;
}