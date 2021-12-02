import {Group} from "../../../../groups/models/group";
import {Vehicle} from "../../../../vehicles/models/vehicle";

export class Vbasr{
    id:number;
    creationDate:string;
    totalMileage:number;
    idle:string;
    active:string;
    violationNumber:number;
    maxSpeed:number;
    averageSpeed: number;
    shiftStartDate: string;
    shiftEndDate: string;
    userId: string;
    groupId: number;
    group: Group;
    vehicleId: number;
    vehicle: Vehicle;
}
