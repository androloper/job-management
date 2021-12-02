import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {ITrService} from "./ITr.service";
import {Tr} from '../models/tr';

@Injectable({
    providedIn: 'root'
})
export class TrService extends Repository<Tr> implements ITrService{

}
