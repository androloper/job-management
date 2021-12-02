import {IRepository} from "../../../services/IRepository";
import {BankInformations} from "../models/employee-profile";

export interface IBankService extends IRepository<BankInformations> {
}
