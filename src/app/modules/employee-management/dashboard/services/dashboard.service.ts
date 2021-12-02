import {IDashboardService} from "./IDashboard.service";
import {Dashboard} from "../models/dashboard";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends Repository<Dashboard> implements IDashboardService {
}
