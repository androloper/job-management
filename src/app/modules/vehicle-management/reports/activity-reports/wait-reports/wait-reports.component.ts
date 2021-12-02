import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {PaginationResponse} from "../../../../services/pagination-response";
import {WrService} from "./services/wr.service";
import {Wr} from "./models/wr";

@Component({
  selector: 'wait-reports',
  templateUrl: './wait-reports.component.html',
    styleUrls: ['../activity-reports.component.scss']
})
export class WaitReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/WaitReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Wr>();
    ColumnMode = ColumnMode;
    constructor(private wrService: WrService,
                private paginationResponse: PaginationResponse<Wr>) {
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
        this.wrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt14.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
