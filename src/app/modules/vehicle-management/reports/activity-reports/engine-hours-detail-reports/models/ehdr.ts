import {Vehicle} from "../../../../vehicles/models/vehicle";
import {Device} from "../../../../devices/models/device";

export class Ehdr {
    id: number;
    date: string;
    coordinates: string;
    address: string;
    workingHours: string;
    ignition: boolean;
    creationDate: boolean;
    vehicleId: number;
    vehicle: Vehicle;
    deviceId: number;
    device: Device;
}
