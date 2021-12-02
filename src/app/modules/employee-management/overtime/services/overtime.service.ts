import {IOvertimeService} from "./IOvertime.service";
import {Overtime} from "../models/overtime";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class OvertimeService extends Repository<Overtime> implements IOvertimeService {
}
