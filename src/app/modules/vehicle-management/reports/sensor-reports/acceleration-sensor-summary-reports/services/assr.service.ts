import {Injectable} from "@angular/core";
import {IAssrService} from "./IAssr.service";
import {Repository} from "../../../../../services/repository";
import {Assr} from "../models/assr";

@Injectable({
    providedIn: 'root'
})
export class AssrService extends Repository<Assr> implements IAssrService {
}
