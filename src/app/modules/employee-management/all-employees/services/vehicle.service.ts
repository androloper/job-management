import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {UserVehicleInformations} from "../models/employee-profile";
import {IVehicleService} from "./IVehicle.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends Repository<UserVehicleInformations> implements IVehicleService {
}
