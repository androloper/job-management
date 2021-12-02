import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {PaginationResponse} from "../../../../services/pagination-response";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {Asdr} from "./models/asdr";
import {AsdrService} from "./services/asdr.service";

@Component({
  selector: 'acceleration-sensor-detail-reports',
  templateUrl: './acceleration-sensor-detail-reports.component.html',
    styleUrls:['../sensor-reports.component.scss']
})
export class AccelerationSensorDetailReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/AccelerationSensorDetailReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Asdr>();
    ColumnMode = ColumnMode;
    constructor(private asdrService: AsdrService,
                private paginationResponse: PaginationResponse<Asdr>) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }

    ngOnInit(): void {
        this.setPage({ offset: 0 });
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
       // this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`).subscribe((data:PaginationResponse<any>) => {
        this.asdrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt19.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
