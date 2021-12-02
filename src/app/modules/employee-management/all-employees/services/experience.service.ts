import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Experiences} from "../models/employee-profile";
import {IExperienceService} from "./IExperience.service";

@Injectable({
    providedIn: 'root'
})
export class ExperienceService extends Repository<Experiences> implements IExperienceService {
}
