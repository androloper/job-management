import {IProjectService} from "./IProject.service";
import {Project} from "../models/project";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class ProjectService extends Repository<Project> implements IProjectService {
}
