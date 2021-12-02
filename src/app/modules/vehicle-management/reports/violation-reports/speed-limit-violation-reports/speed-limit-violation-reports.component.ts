import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../../../services/pagination-response";
import {Slvr} from "./models/slvr";
import {SlvrService} from "./services/slvr.service";

@Component({
  selector: 'speed-limit-violation-reports',
  templateUrl: './speed-limit-violation-reports.component.html',
    styleUrls: ['../violation-reports.component.scss']
})
export class SpeedLimitViolationReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/SpeedLimitViolationReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Slvr>();
    ColumnMode = ColumnMode;
    constructor(private slvrService:SlvrService,
                private paginationResponse: PaginationResponse<Slvr>) {
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
        this.slvrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt22.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
