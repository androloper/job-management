import {Group} from "../../groups/models/group";

export class Vehicle {
    id:number;
    make: string;
    model: string;
    plate: string;
    color: string;
    km: string;
    userId: string;
    serialNumber: string;
    driverName: string;
    groupId: string;
    group: Group;
    user: User;
}

export class User{
    id:number;
    firstName:string;
    lastName:string;
    isActive:boolean;
}
