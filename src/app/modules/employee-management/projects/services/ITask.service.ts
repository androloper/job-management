import {IRepository} from "../../../services/IRepository";
import {Tasks} from "../models/task";

export interface ITaskService extends IRepository<Tasks> {
}
