import {Injectable} from "@angular/core";
import {Repository} from "../../../../../../services/repository";
import {Tmr} from "../models/tmr";
import {ITmrService} from "./ITmr.service";

@Injectable({
    providedIn: 'root'
})
export class TmrService extends Repository<Tmr> implements ITmrService {

}
