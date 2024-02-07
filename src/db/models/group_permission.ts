"use strict";

import { Model } from "sequelize";

interface GroupPermissionAttributes {
    id: number;
    roleId: string;
    permission: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Group_Permission
        extends Model<GroupPermissionAttributes>
        implements GroupPermissionAttributes
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        roleId!: string;
        permission!: string;
        static associate(models: any) {
            Group_Permission.belongsTo(models.Role, {
                foreignKey: "roleId",
                targetKey: "id",
                as: "RGroupPermissionData",
            });
            Group_Permission.belongsTo(models.Permission, {
                foreignKey: "permission",
                targetKey: "id",
                as: "PGroupPermissionData",
            });
        }
    }
    Group_Permission.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            roleId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            permission: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Group_Permission",
        }
    );
    return Group_Permission;
};
