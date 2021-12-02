import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {IAvrService} from "./IAvr.service";
import {Avr} from "../models/avr";

@Injectable({
    providedIn: 'root'
})
export class AvrService extends Repository<Avr> implements IAvrService {
}
