import {Component, OnInit} from "@angular/core";
import {SharedService} from "../../../../../shared/shared.service";

@Component({
    selector: 'vehicle-report',
    templateUrl: './vehicle-report.component.html',
    styleUrls: ['../../../../vehicle-management/reports/activity-reports/activity-reports.component.scss']
})
export class VehicleReportComponent implements OnInit {
    vehicleId:any;
    constructor(private sharedService:SharedService) {
    }
    ngOnInit(): void {
        this.vehicleId = this.sharedService.getId();
    }
}
