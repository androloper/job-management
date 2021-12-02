import {Injectable} from "@angular/core";
import {Repository} from "../../../../../services/repository";
import {Iocr} from "../models/iocr";
import {IIocrService} from "./IIocr.service";

@Injectable({
    providedIn: 'root'
})
export class IocrService extends Repository<Iocr> implements IIocrService{

}
