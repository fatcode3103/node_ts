import db from "../db/models";
import { Op } from "sequelize";
import { RolePermissionResponse, NewRoleType, UpdateRoleType } from "../types";
import transaction from "sequelize/types/transaction";

type ModifiedPermissions = {
    permissionName: string[];
    permissionId: any[];
};

const getAllRoles = async () => {
    try {
        const res: RolePermissionResponse[] = await db.Role.findAll({
            include: {
                model: db.Group_Permission,
                as: "RGroupPermissionData",
                attributes: ["permission"],
                include: {
                    model: db.Permission,
                    as: "PGroupPermissionData",
                    attributes: ["name"],
                },
            },
        });
        const modifiedRes = res.map((item) => {
            const permissions = item.RGroupPermissionData.map((innerItem) => ({
                name: innerItem.PGroupPermissionData?.name || null,
                permissionId: innerItem.permission,
            }));
            const { RGroupPermissionData, ...rest } = item.get({ plain: true });
            const modifiedPermissions: ModifiedPermissions = {
                permissionName: [],
                permissionId: [],
            };
            permissions.forEach((per) => {
                if (per.name !== null) {
                    modifiedPermissions.permissionName.push(per.name);
                    modifiedPermissions.permissionId.push(per.permissionId);
                }
            });
            return {
                ...rest,
                permissionName: modifiedPermissions.permissionName,
                permissionId: modifiedPermissions.permissionId,
            };
        });
        if (res)
            return {
                data: modifiedRes,
                message: "Get all roles successful",
            };
        throw { errorCode: 404, message: "Get all roles failed" };
    } catch (e) {
        throw e;
    }
};

const postNewRole = async (
    data: NewRoleType,
    transaction?: transaction,
    ut = false
) => {
    try {
        if (!!data) {
            const role = await db.Role.create(
                {
                    name: data.name,
                },
                { transaction: transaction }
            );
            const bulkPermissionArray = data.permissionId.map((item) => {
                return {
                    roleId: role.id,
                    permission: item,
                };
            });
            const groupPermission = await db.Group_Permission.bulkCreate(
                bulkPermissionArray,
                { transaction: transaction }
            );

            const allRoles = await getAllRoles();
            if (!!role && !!groupPermission) {
                if (!ut && transaction) await transaction.commit();
                return {
                    data: allRoles.data,
                    message: "Add new role successful",
                };
            }
            throw { errorCode: 404, message: "Add new role failed" };
        }
        throw { errorCode: 400, message: "Add new role failed" };
    } catch (e) {
        if (transaction) await transaction.rollback();
        throw e;
    }
};

const getPermission = async () => {
    try {
        const res = await db.Permission.findAll();
        if (res)
            return {
                data: res,
                message: "Get all permissions successful",
            };
        throw { errorCode: 404, message: "Get all permissions failed" };
    } catch (e) {
        throw e;
    }
};

const deleteRole = async (roleId: number, transaction?: transaction) => {
    try {
        if (!!roleId) {
            const res = await db.Role.findOne({
                where: { id: roleId },
            });
            if (res) {
                await res.destroy({ transaction: transaction });
                await db.Group_Permission.destroy(
                    {
                        where: {
                            roleId: roleId,
                        },
                    },
                    { transaction: transaction }
                );
                const allRoles = await getAllRoles();
                return {
                    data: allRoles.data,
                    message: "Delete role successful",
                };
            }
            throw { errorCode: 404, message: "Delete role failed" };
        }
        throw { errorCode: 400, message: "Role not found" };
    } catch (e) {
        throw e;
    }
};

const updateRole = async (data: UpdateRoleType, transaction?: transaction) => {
    const { name, roleId, additionId, removeId } = data;
    try {
        const res = await db.Role.findOne({
            where: { id: roleId },
        });
        await res.update(
            {
                name: name,
            },
            { transaction: transaction }
        );
        if (additionId && additionId.length > 0) {
            const bulkPermissionArray = data.additionId.map((item) => {
                return {
                    roleId: roleId,
                    permission: item,
                };
            });
            await db.Group_Permission.bulkCreate(bulkPermissionArray, {
                transaction: transaction,
            });
        }
        if (removeId && removeId.length > 0) {
            for (const item in removeId) {
                await db.Group_Permission.destroy(
                    {
                        where: {
                            [Op.and]: [
                                { roleId: roleId },
                                { permission: removeId[item] },
                            ],
                        },
                    },
                    { transaction: transaction }
                );
            }
        }
        const allRoles = await getAllRoles();
        if (res)
            return {
                data: allRoles.data,
                message: "Update role successful",
            };
        throw { errorCode: 404, message: "Update role failed" };
    } catch (e) {
        throw e;
    }
};

const deletePermission = async (
    permissionId: number,
    transaction?: transaction
) => {
    try {
        if (!!permissionId) {
            const res = await db.Permission.findOne({
                where: { id: permissionId },
            });
            if (res) {
                await res.destroy({ transaction: transaction });
                const allPermissions = await getPermission();
                return {
                    data: allPermissions.data,
                    message: "Delete permisson successful",
                };
            }
            throw { errorCode: 404, message: "Delete permisson failed" };
        }
        throw { errorCode: 400, message: "Permission not found" };
    } catch (e) {
        throw e;
    }
};

const postNewPermission = async (
    data: { name: string },
    transaction?: transaction
) => {
    try {
        if (!!data) {
            const res = await db.Permission.create(
                {
                    name: data.name,
                },
                { transaction: transaction }
            );
            if (res) {
                const allPermissions = await getPermission();
                return {
                    data: allPermissions.data,
                    message: "Add new permisson successful",
                };
            }
            throw { errorCode: 404, message: "Add new permisson failed" };
        }
        throw { errorCode: 400, message: "Permission not found" };
    } catch (e) {
        throw e;
    }
};

const updatePermission = async (
    data: { name: string; permissionId: number },
    transaction?: transaction
) => {
    try {
        if (!!data) {
            const res = await db.Permission.findOne({
                where: {
                    id: data.permissionId,
                },
            });
            await res.update({ name: data.name }, { transaction: transaction });
            await res.save();
            if (res) {
                const allPermissions = await getPermission();
                return {
                    data: allPermissions.data,
                    message: "Update permisson successful",
                };
            }
            throw { errorCode: 404, message: "Update permisson failed" };
        }
        throw { errorCode: 400, message: "Permission not found" };
    } catch (e) {
        throw e;
    }
};

export {
    getAllRoles,
    postNewRole,
    getPermission,
    deleteRole,
    updateRole,
    deletePermission,
    postNewPermission,
    updatePermission,
};
