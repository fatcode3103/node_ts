"use strict";

import { Model } from "sequelize";

interface UserAttributes {
    id: number;
    name: string;
    age: string;
    roleId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        age!: string;
        roleId!: number;
        static associate(models: any) {
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                targetKey: "id",
                as: "roleUserData",
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
