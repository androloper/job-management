import {IRepository} from "../../../services/IRepository";
import {EmergencyContactInfos} from "../models/employee-profile";

export interface IEmergencyService extends IRepository<EmergencyContactInfos> {
}
