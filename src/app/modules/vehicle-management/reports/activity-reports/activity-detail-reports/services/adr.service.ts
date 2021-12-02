import {Injectable} from "@angular/core";
import {IAdrService} from "./IAdr.service";
import {Repository} from "../../../../../services/repository";
import {Adr} from "../model/adr";

@Injectable({
    providedIn: 'root'
})
export class AdrService extends Repository<Adr> implements IAdrService {
}
