import {IRepository} from "../../../services/IRepository";
import {UserVehicleInformations} from "../models/employee-profile";

export interface IVehicleService extends IRepository<UserVehicleInformations> {
}
