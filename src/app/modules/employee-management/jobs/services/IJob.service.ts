import {IRepository} from "../../../services/IRepository";
import {Job} from "../models/job";

export interface IJobService extends IRepository<Job> {
}
