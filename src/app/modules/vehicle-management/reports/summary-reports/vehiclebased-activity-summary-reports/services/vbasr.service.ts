import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {Vbasr} from "../models/vbasr";
import {IVbasrService} from "./IVbasr.service";

@Injectable({
    providedIn: 'root'
})
export class VbasrService extends Repository<Vbasr> implements IVbasrService {

}
