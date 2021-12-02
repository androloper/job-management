import {IRepository} from "../../../services/IRepository";
import {Department} from "../models/department";

export interface IDepartmentService extends IRepository<Department> {
    getListByManager(managerId: number);
}
