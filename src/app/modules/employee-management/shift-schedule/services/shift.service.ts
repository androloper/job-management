import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";
import {Shift} from "../models/shift";
import {IShiftService} from "./IShift.service";

@Injectable({
    providedIn: 'root'
})
export class ShiftService extends Repository<Shift> implements IShiftService {
}
