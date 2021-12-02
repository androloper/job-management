import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Job} from "../models/employee-profile";
import {IJobService} from "./IJob.service";

@Injectable({
    providedIn: 'root'
})
export class JobService extends Repository<Job> implements IJobService {
}
