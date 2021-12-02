import {IDepartmentService} from "./IDepartment.service";
import {Department} from "../models/department"
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends Repository<Department> implements IDepartmentService {
    getListByManager(managerId: number) {
    }
}
