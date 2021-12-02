import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../../../../environments/environment";
import {Page} from "../../../../../../services/page";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../../../../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../../../../../../shared/shared.service";
import {Hbmr} from "../../../../../reports/summary-reports/mileage-reports/hourbased-mileage-reports/models/hbmr";

@Component({
    selector: 'hbmr',
    templateUrl: './hbmr.component.html',
    styleUrls: ['../../../../../reports/activity-reports/activity-reports.component.scss']
})
export class HbmrComponent implements OnInit {
    private apiUrl = `${environment.vehicleTrackingUrl}/HourBasedMileageReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Hbmr>();
    vehicleId: any;
    ColumnMode = ColumnMode;

    constructor(private httpService: HttpClient,
                private sharedService: SharedService,
                private paginationResponse: PaginationResponse<Hbmr>) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }

    ngOnInit(): void {
        this.getListPaginationByVehicleId({offset:0});
    }

    getListPaginationByVehicleId(pageInfo) {
        this.vehicleId = this.sharedService.getId();
        this.page.pageNumber = (pageInfo.offset + 1);
        this.httpService.get(`${this.apiUrl}/GetListPaginationByVehicleId?VehicleId=${this.vehicleId}&PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`)
            .subscribe((data: PaginationResponse<any>) => {
                console.log(data['data']);
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt46.datatable-scroll').width('100%');
                }, 2000);
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
