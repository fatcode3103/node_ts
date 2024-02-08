import { expect } from "chai";
import db from "../src/db/models";
import * as userService from "../src/services/user";
import * as roleService from "../src/services/role";
import transaction from "sequelize/types/transaction";
import {
    NewUserType,
    UpdateUserType,
    NewRoleType,
    UpdateRoleType,
} from "../src/types";

describe("userService", () => {
    let transaction: transaction;
    beforeEach(async () => {
        transaction = await db.sequelize.transaction();
    });
    afterEach(async () => {
        // not change db
        await transaction.rollback();
    });

    // get users result
    it("should have a array of users", async () => {
        const res = await userService.getAllUsers();
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Get all users successful");
    });
    // add new user
    it("should add a new user successfully", async () => {
        const dataToSend: NewUserType = {
            name: "user",
            age: "20",
            roleId: 13,
        };
        const res = await userService.postNewUser(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Add user successful");
    });
    // delete user
    it("should delete user successfully", async () => {
        const dataToSend = 35;
        const res = await userService.deleteUser(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Delete user successful");
    });
    // update user
    it("should update user successfully", async () => {
        const dataToSend: UpdateUserType = {
            id: 35,
            name: "user",
            age: "20",
            roleId: 13,
        };
        const res = await userService.updateUser(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Update user successful");
    });
});

describe("roleService", () => {
    let transaction: transaction;
    beforeEach(async () => {
        transaction = await db.sequelize.transaction();
    });
    afterEach(async () => {
        // not change db
        await transaction.rollback();
    });

    // get roles result
    it("should have a array of roles", async () => {
        const res = await roleService.getAllRoles();
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Get all roles successful");
    });
    // get permissions result
    it("should have a array of permissions", async () => {
        const res = await roleService.getPermission();
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Get all permissions successful");
    });
    // add new role
    it("should add new role", async () => {
        const dataToSend: NewRoleType = {
            name: "Admin",
            permissionId: [1],
        };
        const ut = true;
        const res = await roleService.postNewRole(dataToSend, transaction, ut);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Add new role successful");
    });
    // delete role
    it("should delete role", async () => {
        const dataToSend = 20;
        const res = await roleService.deleteRole(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Delete role successful");
    });
    // update role
    it("should update role", async () => {
        const dataToSend: UpdateRoleType = {
            roleId: 13,
            name: "Admin",
            additionId: [],
            removeId: [3],
        };
        const res = await roleService.updateRole(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Update role successful");
    });
    // delete permission
    it("should delete permission", async () => {
        const dataToSend = 1;
        const res = await roleService.deletePermission(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Delete permisson successful");
    });
    // delete permission
    it("should add new permission", async () => {
        const dataToSend = {
            name: "abc",
        };
        const res = await roleService.postNewPermission(
            dataToSend,
            transaction
        );
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Add new permisson successful");
    });
    // update permission
    it("should update permission", async () => {
        const dataToSend = {
            name: "abc",
            permissionId: 1,
        };
        const res = await roleService.updatePermission(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Update permisson successful");
    });
});
