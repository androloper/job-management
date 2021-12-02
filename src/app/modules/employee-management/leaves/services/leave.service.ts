import {ILeaveService} from "./ILeave.service";
import {Leave} from "../models/leave";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class LeaveService extends Repository<Leave> implements ILeaveService {
}
