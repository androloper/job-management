import {Injectable} from "@angular/core";
import {IDbasrService} from "./IDbasr.service";
import {Repository} from "../../../../../services/repository";
import {Dbasr} from "../models/dbasr";

@Injectable({
    providedIn: 'root'
})
export class DbasrService extends Repository<Dbasr> implements IDbasrService {
}
