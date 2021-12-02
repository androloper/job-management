import {IScheduleService} from "./ISchedule.service";
import {Schedule} from "../models/schedule";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends Repository<Schedule> implements IScheduleService {
}
