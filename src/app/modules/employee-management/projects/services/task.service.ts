import {ITaskService} from "./ITask.service";
import {Tasks} from "../models/task";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class TaskService extends Repository<Tasks> implements ITaskService {
}
