import {Vehicle} from "../../../vehicles/models/vehicle";
import {Companies} from "../../companies/models/companies";
import {ServiceTypes} from "../../service-types/models/service-types";

export class AllServices{
    id:number;
    createdDate:string;
    description:string;
    vehicleId:number;
    vehicle: Vehicle;
    serviceCompanyId:number;
    serviceCompany: Companies;
    serviceTypeId: number;
    serviceType: ServiceTypes;
}
