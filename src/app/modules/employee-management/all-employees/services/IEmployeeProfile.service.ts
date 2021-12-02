import {IRepository} from "../../../services/IRepository";
import {EmployeeProfile} from "../models/employee-profile";
import {Observable} from "rxjs";
import {Response} from "../../../services/Response";

export interface IEmployeeProfileService extends IRepository<EmployeeProfile> {
    profileImageUpload(userId:string, formData:FormData, actionUrl: string): Observable<Response>;
}
