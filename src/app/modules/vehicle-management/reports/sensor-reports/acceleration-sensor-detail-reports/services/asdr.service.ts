import {Injectable} from "@angular/core";
import {IAsdrService} from "./IAsdr.service";
import {Repository} from "../../../../../services/repository";
import {Asdr} from "../models/asdr";

@Injectable({
    providedIn: 'root'
})
export class AsdrService extends Repository<Asdr> implements IAsdrService {
}
