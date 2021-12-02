import {Repository} from "../../../../../services/repository";
import {IIrarService} from "./IIrar.service";
import {Irar} from "../models/irar";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class IrarService extends Repository<Irar> implements IIrarService {

}
