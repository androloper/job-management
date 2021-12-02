import {IEmployeeService} from "./IEmployee.service";
import {Employee} from "../models/employee";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends Repository<Employee> implements IEmployeeService {
}
