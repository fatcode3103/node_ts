import express from "express";

import * as userController from "../controllers/userController";
import * as roleController from "../controllers/roleController";

const router = express.Router();

router.get("/get-users", userController.getAllUsers);
router.post("/add-new-user", userController.postNewUser);
router.delete("/delete-user", userController.deleteUser);
router.put("/update-user", userController.updateUser);

router.get("/get-roles", roleController.getAllRoles);
router.post("/add-new-role", roleController.postNewRole);
router.delete("/delete-role", roleController.deleteRole);
router.put("/update-role", roleController.updateRole);
router.get("/get-permissions", roleController.getPermission);
router.post("/add-new-permission", roleController.postNewPermission);
router.delete("/delete-permission", roleController.deletePermission);
router.put("/update-permission", roleController.updatePermission);

export default router;
