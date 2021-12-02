import {Tasks} from "./task";

export class TaskComments {
    id: number;
    comment: string;
    createBy: string;
    createdDate: string;
    updateBy: string;
    updatedDate: string;
    isActive: boolean;
    taskId: number;
    task: Tasks;
}
