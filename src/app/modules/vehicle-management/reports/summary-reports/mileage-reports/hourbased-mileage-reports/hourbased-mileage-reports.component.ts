import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../../environments/environment";
import {Page} from "../../../../../services/page";
import {PaginationResponse} from "../../../../../services/pagination-response";
import {Hbmr} from "./models/hbmr";
import {HbmrService} from "./services/hbmr.service";

@Component({
  selector: 'hourbased-mileage-reports',
  templateUrl: './hourbased-mileage-reports.component.html',
    styleUrls: ['../../summary-reports.component.scss']
})
export class HourbasedMileageReportsComponent implements OnInit {
    private apiUrl = `${environment.vehicleTrackingUrl}/HourBasedMileageReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Hbmr>();
    ColumnMode = ColumnMode;
    constructor(private hbmrService: HbmrService,
                private paginationResponse: PaginationResponse<Hbmr>) {
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
        //this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`).subscribe((data: PaginationResponse<any>) => {
        this.hbmrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt28.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
