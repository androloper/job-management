import {IJobService} from "./IJob.service";
import {Job} from "../models/job";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class JobService extends Repository<Job> implements IJobService {
}
