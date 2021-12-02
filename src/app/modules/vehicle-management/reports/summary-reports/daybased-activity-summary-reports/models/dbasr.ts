import {Vehicle} from "../../../../vehicles/models/vehicle";

export class Dbasr {
    id:number;
    totalMileage:number;
    idle: string;
    active:string;
    violationNumber: number;
    maxSpeed: number;
    averageSpeed: number;
    shiftStartDate: string;
    shiftEndDate: string;
    day:string;
    creationDate: string;
    vehicleId: number;
    vehicle: Vehicle;
}
