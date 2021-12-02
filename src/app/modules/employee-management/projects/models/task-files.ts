import {Tasks} from "./task";

export class TaskFiles {
    id: number;
    name: string;
    type: number;
    url: string;
    createBy: string;
    createdDate: string;
    updateBy: string;
    updatedDate: string;
    isActive: boolean;
    taskId: number;
    task: Tasks;
}
