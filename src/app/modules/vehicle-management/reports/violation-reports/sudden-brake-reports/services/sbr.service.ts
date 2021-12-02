import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {ISbrService} from "./ISbr.service";
import {Sbr} from "../models/sbr";

@Injectable({
    providedIn: 'root'
})
export class SbrService extends Repository<Sbr> implements ISbrService {

}
