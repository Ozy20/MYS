module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employees', {
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
        userName:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:{msg:"Username cannot be empty"},
                notContains:{
                    args:[' '],
                    msg:'Username cannot contain spaces.'
                }
                ,len:[6,15]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
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
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
    }});

    return Employee;
}