import {Injectable} from "@angular/core";
import {Repository} from "../../../../services/repository";
import {Companies} from "../models/companies";
import {ICompaniesService} from "./ICompanies.service";

@Injectable({
    providedIn: 'root'
})
export class CompaniesService extends Repository<Companies> implements ICompaniesService {
}
