"use strict";

import { Model } from "sequelize";

interface RoleAttributes {
    id: number;
    name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Role extends Model<RoleAttributes> implements RoleAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        static associate(models: any) {
            Role.hasOne(models.User, {
                foreignKey: "roleId",
                as: "roleUserData",
            });
            Role.hasMany(models.Group_Permission, {
                foreignKey: "roleId",
                as: "RGroupPermissionData",
            });
        }
    }
    Role.init(
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
        },
        {
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};
