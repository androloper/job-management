import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {HttpClient} from "@angular/common/http";
import {PaginationResponse} from "../../../../services/pagination-response";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {RarService} from "./services/rar.service";
import {Rar} from "./models/rar";

@Component({
  selector: 'region-activity-reports',
  templateUrl: './region-activity-reports.component.html',
    styleUrls: ['../region-reports.component.scss']
})
export class RegionActivityReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/RegionActivityReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Rar>();
    ColumnMode = ColumnMode;
    constructor(private rarService:RarService,
                private paginationResponse: PaginationResponse<Rar>) {
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
        this.rarService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt17.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
