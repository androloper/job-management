import {Injectable} from "@angular/core";
import {Ehdr} from "../models/ehdr";
import {Repository} from "../../../../../services/repository";
import {IEhdrService} from "./IEhdr.service";

@Injectable({
    providedIn: 'root'
})
export class EhdrService extends Repository<Ehdr> implements IEhdrService {
}
