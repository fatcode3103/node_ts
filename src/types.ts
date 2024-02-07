export type UserResponse = {
    id: number;
    name: string;
    age: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type RoleResponse = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type RolePermission = {
    RGroupPermissionData: RGroupPermission[];
};

export type PGroupPermission = {
    name: any;
};

export type RGroupPermission = {
    permission: string;
    PGroupPermissionData: PGroupPermission;
};

export type UserRole = {
    name: string;
    id: number;
    RGroupPermissionData: RGroupPermission[];
};

export type UserRoleResponse = UserResponse & {
    roleUserData: UserRole;
    [x: string]: any;
};

export type RolePermissionResponse = RoleResponse &
    RolePermission & {
        [x: string]: any;
    };

export type NewUserType = {
    name: string;
    age: string;
    roleId: number;
};

export type UpdateUserType = NewUserType & {
    id: number;
};

export type NewRoleType = {
    name: string;
    permissionId: number[];
};

export type UpdateRoleType = {
    name: string;
    roleId: number;
    additionId: number[];
    removeId: number[];
};
