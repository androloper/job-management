import {Injectable} from "@angular/core";
import {Repository} from "../../../../../../services/repository";
import {Hbmr} from "../models/hbmr";
import {IHbmrService} from "./IHbmr.service";

@Injectable({
    providedIn: 'root'
})
export class HbmrService extends  Repository<Hbmr> implements IHbmrService {

}
