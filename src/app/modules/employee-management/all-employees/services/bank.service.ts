import {Repository} from "../../../services/repository";
import {BankInformations} from "../models/employee-profile";
import {IBankService} from "./IBank.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BankService extends Repository<BankInformations> implements IBankService {
}
