import {IRepository} from "../../../services/IRepository";
import {Holiday} from "../models/holiday";

export interface IHolidayService extends IRepository<Holiday> {
}
