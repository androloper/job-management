import {Leave} from "./leave";

export class LeaveTypes {
    id:number;
    title: string;
    createBy:string;
    day:string;
    createdDate:string;
    updateBy:string;
    updatedDate:string;
    isActive:boolean;
    userLeaves: Leave;
}
