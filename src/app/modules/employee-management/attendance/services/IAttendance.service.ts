import {IRepository} from "../../../services/IRepository";
import {Attendance} from "../models/attendance";

export interface IAttendanceService extends IRepository<Attendance> {
}
