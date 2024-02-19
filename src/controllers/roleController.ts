import { Request, Response } from "express";

import * as roleService from "../services/role";
import db from "../db/models";

const getAllRoles = async (req: Request, res: Response) => {
    try {
        const data = await roleService.getAllRoles();
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const postNewRole = async (req: Request, res: Response) => {
    try {
        const transaction = await db.sequelize.transaction();
        const data = await roleService.postNewRole(req.body, transaction);
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const getPermission = async (req: Request, res: Response) => {
    try {
        const data = await roleService.getPermission();
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const deleteRole = async (req: Request, res: Response) => {
    try {
        const data = await roleService.deleteRole(Number(req.query.roleId));
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const updateRole = async (req: Request, res: Response) => {
    try {
        const data = await roleService.updateRole(req.body);
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const deletePermission = async (req: Request, res: Response) => {
    try {
        const data = await roleService.deletePermission(
            Number(req.query.permissionId)
        );
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const postNewPermission = async (req: Request, res: Response) => {
    try {
        const data = await roleService.postNewPermission(req.body);
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const updatePermission = async (req: Request, res: Response) => {
    try {
        const data = await roleService.updatePermission(req.body);
        return res.status(200).json(data);
    } catch (e: any) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
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
