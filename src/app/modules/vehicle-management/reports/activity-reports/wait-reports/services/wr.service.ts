import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {Wr} from "../models/wr";
import {IWrService} from "./IWr.service";

@Injectable({
    providedIn: 'root'
})
export class WrService extends Repository<Wr> implements IWrService{

}
