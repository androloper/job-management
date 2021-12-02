import {Project} from "./project";
import {UserAssignments} from "./user-assignments";
import {TaskComments} from "./task-comments";
import {TaskFiles} from "./task-files";
import {TaskStatuses} from "./task-statuses";

export class Tasks {
    id: number;
    title: string;
    description: string;
    priority: string;
    approvedBy: string;
    dueDate: string;
    status: number;
    createBy: string;
    createdDate: string;
    updateBy: string;
    updatedDate: string;
    isActive: boolean;
    projectId: number;
    project: Project;
    taskStatusId: number;
    taskStatus: TaskStatuses;
    userAssignments: UserAssignments;
    taskComments: TaskComments;
    taskFiles: TaskFiles;
}
