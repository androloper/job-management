import {Injectable} from "@angular/core";
import {Repository} from "../../../../services/repository";
import {IServiceTypesService} from "./IServiceTypes.service";
import {ServiceTypes} from "../models/service-types";

@Injectable({
    providedIn: 'root'
})
export class ServiceTypesService extends Repository<ServiceTypes> implements IServiceTypesService {
}
