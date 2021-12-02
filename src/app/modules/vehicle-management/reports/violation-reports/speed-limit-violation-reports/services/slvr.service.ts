import {ISlvrService} from "./ISlvr.service";
import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {Slvr} from "../models/slvr";

@Injectable({
    providedIn: 'root'
})
export class SlvrService extends Repository<Slvr> implements ISlvrService {

}
