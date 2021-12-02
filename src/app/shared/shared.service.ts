import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    vehicleId:any;
    constructor() {
    }
    setId(data){
        this.vehicleId=data;
    }
    getId(){
        return this.vehicleId;
    }
}
