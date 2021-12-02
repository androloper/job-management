import {LeaveTypes} from "./leave-types";

export class Leave{
    id: number;
    type: number;
    dateFrom: string;
    dateTo: string;
    reason: string;
    status: string;
    approvedBy: string;
    createBy: string;
    createdDate: string;
    updateBy: string;
    updatedDate: string;
    isActive: boolean;
    userId: string;
    user: User;
    leavesTypeId: number;
    leavesType: LeaveTypes;
}

export class User{
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    isActive: boolean;
}

