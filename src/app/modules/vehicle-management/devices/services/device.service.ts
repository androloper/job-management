import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Device} from "../models/device";
import {IDeviceService} from "./IDevice.service";

@Injectable({
    providedIn: 'root'
})
export class DeviceService extends Repository<Device> implements IDeviceService {
}
