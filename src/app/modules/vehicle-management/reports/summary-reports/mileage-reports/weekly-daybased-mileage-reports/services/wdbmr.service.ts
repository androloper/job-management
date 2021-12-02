import {Injectable} from "@angular/core";
import {Repository} from "../../../../../../services/repository";
import {Wdbmr} from "../models/wdbmr";
import {IWdbmrService} from "./IWdbmr.service";

@Injectable({
    providedIn: 'root'
})
export class WdbmrService extends Repository<Wdbmr> implements IWdbmrService{

}
