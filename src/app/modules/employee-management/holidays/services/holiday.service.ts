import {IHolidayService} from "./IHoliday.service";
import {Holiday} from "../models/holiday";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class HolidayService extends Repository<Holiday> implements IHolidayService {
}
