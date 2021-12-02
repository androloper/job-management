import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {IRasrService} from "./IRasr.service";
import {Rasr} from "../models/rasr";

@Injectable({
    providedIn: 'root'
})
export class RasrService extends  Repository<Rasr> implements IRasrService {

}
