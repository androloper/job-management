import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Addresses} from "../models/employee-profile";
import {IAddressService} from "./IAddress.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService extends Repository<Addresses> implements IAddressService {
}
