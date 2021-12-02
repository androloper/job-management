import {Tasks} from "./task";
import {ProjectTeams} from "./project-teams";
import {Leaders} from "./laeders";

export class Project {
    id: number;
    title: string;
    description: string;
    priority: number;
    startDate: string;
    endDate: string;
    createdDate: string;
    createBy: string;
    updatedDate: string;
    updateBy: string;
    isActive: number;
    leaders: Leaders;
    projectTeams: ProjectTeams;
    tasks: Tasks;
}
export class Users {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    isActive: boolean;
}
