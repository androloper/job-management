import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {PaginationResponse} from "../../../../services/pagination-response";
import {VsrService} from "./services/vsr.service";
import {Vsr} from "./models/vsr";

@Component({
  selector: 'violation-summary-reports',
  templateUrl: './violation-summary-reports.component.html',
    styleUrls: ['../summary-reports.component.scss']
})
export class ViolationSummaryReportsComponent implements OnInit {
    private apiUrl = `${environment.vehicleTrackingUrl}/ViolationSummaryReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Vsr>();
    ColumnMode = ColumnMode;
    constructor(private vsrService:VsrService,
                private paginationResponse: PaginationResponse<Vsr>) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }

    ngOnInit(): void {
        this.setPage({offset: 0});
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        // this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`).subscribe((data: PaginationResponse<any>) => {
        this.vsrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt27.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
