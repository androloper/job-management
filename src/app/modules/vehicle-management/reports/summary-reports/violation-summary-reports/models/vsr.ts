import {User, Vehicle} from "../../../../vehicles/models/vehicle";

export class Vsr {
    id:number;
    creationDate:string;
    speedViolation:number;
    accelarationViolation:number;
    suddenBrake:number;
    territoryViolation:number;
    stopViolation:number;
    userId: string;
    user: User;
    vehicleId: number;
    vehicle: Vehicle;
}
