import {IEducationService} from "./IEducation.service";
import {EducationInformations} from "../models/employee-profile";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class EducationService extends Repository<EducationInformations> implements IEducationService {
}
