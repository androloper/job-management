import {IAttendanceService} from "./IAttendance.service";
import {Attendance} from "../models/attendance";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class AttendanceService extends Repository<Attendance> implements IAttendanceService {
}
