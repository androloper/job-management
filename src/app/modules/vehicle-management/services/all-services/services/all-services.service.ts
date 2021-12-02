import {Injectable} from "@angular/core";
import {Repository} from "../../../../services/repository";
import {AllServices} from "../models/all-services";
import {IAllServicesService} from "./IAllServices.service";

@Injectable({
    providedIn: 'root'
})
export class AllServicesService extends Repository<AllServices> implements IAllServicesService {
}
