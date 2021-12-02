import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Vehicle} from "../models/vehicle";
import {IVehicleService} from "./IVehicle.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends Repository<Vehicle> implements IVehicleService {
}
