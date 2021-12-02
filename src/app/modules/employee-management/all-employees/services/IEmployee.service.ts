import {IRepository} from "../../../services/IRepository";
import {Employee} from "../models/employee";

export interface IEmployeeService extends IRepository<Employee> {
}

