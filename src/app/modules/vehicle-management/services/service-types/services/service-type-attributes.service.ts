import {Injectable} from "@angular/core";
import {Repository} from "../../../../services/repository";
import {ServiceTypeAttributes} from "../models/service-type-attributes";
import {IServiceTypeAttributesService} from "./IServiceTypeAttributes.service";

@Injectable({
    providedIn: 'root'
})
export class ServiceTypeAttributesService extends Repository<ServiceTypeAttributes> implements IServiceTypeAttributesService {
}
