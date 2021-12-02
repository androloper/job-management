import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {HttpClient} from "@angular/common/http";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../../../services/pagination-response";
import {IocrService} from "./services/iocr.service";
import {Iocr} from "./models/iocr";

@Component({
  selector: 'ignition-open-close-reports',
  templateUrl: './ignition-open-close-reports.component.html',
    styleUrls: ['../activity-reports.component.scss']
})
export class IgnitionOpenCloseReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/IgnitionOpenCloseReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Iocr>();
    ColumnMode = ColumnMode;
    constructor(private iocrService:IocrService,
                private paginationResponse: PaginationResponse<Iocr>) {
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
        this.iocrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt12.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
