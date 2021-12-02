import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {IVsrService} from "./IVsr.service";
import {Vsr} from "../models/vsr";

@Injectable({
    providedIn: 'root'
})
export class VsrService extends Repository<Vsr> implements IVsrService{

}
