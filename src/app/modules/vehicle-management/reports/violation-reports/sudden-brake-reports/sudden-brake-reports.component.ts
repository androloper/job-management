import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {PaginationResponse} from "../../../../services/pagination-response";
import {SbrService} from "./services/sbr.service";
import {Sbr} from "./models/sbr";

@Component({
  selector: 'sudden-brake-reports',
  templateUrl: './sudden-brake-reports.component.html',
    styleUrls: ['../violation-reports.component.scss']
})
export class SuddenBrakeReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/SuddenBrakeReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Sbr>();
    ColumnMode = ColumnMode;
    constructor(private sbrService: SbrService,
                private paginationResponse: PaginationResponse<Sbr>) {
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
        this.sbrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt23.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
