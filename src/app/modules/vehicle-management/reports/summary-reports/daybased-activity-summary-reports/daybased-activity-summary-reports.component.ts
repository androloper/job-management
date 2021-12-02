import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {HttpClient} from "@angular/common/http";
import {PaginationResponse} from "../../../../services/pagination-response";
import {Dbasr} from "./models/dbasr";
import {DbasrService} from "./services/dbasr.service";

@Component({
  selector: 'daybased-activity-summary-reports',
  templateUrl: './daybased-activity-summary-reports.component.html',
    styleUrls: ['../summary-reports.component.scss']
})
export class DaybasedActivitySummaryReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/DayBasedActivitySummaryReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Dbasr>();
    ColumnMode = ColumnMode;
    constructor(private dbasrService:DbasrService,
                private paginationResponse: PaginationResponse<Dbasr>) {
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
        //this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`).subscribe((data:PaginationResponse<any>) => {
        this.dbasrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt24.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
