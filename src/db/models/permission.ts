"use strict";

import { Model } from "sequelize";

interface PermissionAttributes {
    id: number;
    name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Permission
        extends Model<PermissionAttributes>
        implements PermissionAttributes
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        static associate(models: any) {
            Permission.hasMany(models.Group_Permission, {
                foreignKey: "permission",
                as: "PGroupPermissionData",
            });
        }
    }
    Permission.init(
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
            modelName: "Permission",
        }
    );
    return Permission;
};
