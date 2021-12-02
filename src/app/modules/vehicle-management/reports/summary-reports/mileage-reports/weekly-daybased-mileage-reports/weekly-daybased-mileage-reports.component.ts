import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../../environments/environment";
import {Page} from "../../../../../services/page";
import {HttpClient} from "@angular/common/http";
import {PaginationResponse} from "../../../../../services/pagination-response";
import {Wdbmr} from "./models/wdbmr";
import {WdbmrService} from "./services/wdbmr.service";

@Component({
  selector: 'weekly-daybased-mileage-reports',
  templateUrl: './weekly-daybased-mileage-reports.component.html',
    styleUrls: ['../../summary-reports.component.scss']
})
export class WeeklyDaybasedMileageReportsComponent implements OnInit {
    private apiUrl = `${environment.vehicleTrackingUrl}/WeeklyDayBasedMileageReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Wdbmr>();
    ColumnMode = ColumnMode;
    constructor(private wdbmrService:WdbmrService,
                private paginationResponse: PaginationResponse<Wdbmr>) {
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
        this.wdbmrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt30.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
