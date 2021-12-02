import {Users} from "./project";
import {Tasks} from "./task";

export class UserAssignments {
    id: number;
    createBy: string;
    createdDate: string;
    updateBy: string;
    updatedDate: string;
    isActive: boolean;
    userId: string;
    user: Users;
    taskId: number;
    task: Tasks;
}
