import {Repository} from "../../../services/repository";
import {EmergencyContactInfos} from "../models/employee-profile";
import {IEmergencyService} from "./IEmergency.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EmergencyService extends Repository<EmergencyContactInfos> implements IEmergencyService {
}
