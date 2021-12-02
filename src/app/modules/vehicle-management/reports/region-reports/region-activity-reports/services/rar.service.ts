import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {IrarService} from "./Irar.service";
import {Rar} from "../models/rar";

@Injectable({
    providedIn: 'root'
})
export class RarService extends Repository<Rar> implements IrarService{

}
