import {Repository} from "../../../services/repository";
import {IEmployeeProfileService} from "./IEmployeeProfile.service";
import {EmployeeProfile} from "../models/employee-profile";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "../../../services/Response";

@Injectable({
    providedIn: 'root'
})
export class EmployeeProfileService extends Repository<EmployeeProfile> implements IEmployeeProfileService {
    profileImageUpload(userId: string, formData: FormData, actionUrl: string): Observable<Response> {
        return this.httpClient.post<Response>(`${actionUrl}/UploadUserProfileByUserId?UserId=${userId}`, formData);
    }
}
