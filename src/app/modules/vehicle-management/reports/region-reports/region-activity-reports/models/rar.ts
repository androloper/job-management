import {User, Vehicle} from "../../../../vehicles/models/vehicle";
import {Group} from "../../../../groups/models/group";

export class Rar {
    id:number;
    creationDate: string;
    region:string;
    entryOrExit: string;
    vehicleId:number;
    vehicle:Vehicle;
    groupId:number;
    group:Group;
    userId: string;
    user: User;
}
