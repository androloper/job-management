import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {Esr} from "../models/esr";
import {IEsrService} from "./IEsr.service";

@Injectable({
    providedIn: 'root'
})
export class EsrService extends Repository<Esr> implements IEsrService {
}
