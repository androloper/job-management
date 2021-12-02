import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {PaginationResponse} from "../../../../services/pagination-response";
import {IrarService} from "./services/irar.service";
import {Irar} from "./models/irar";

@Component({
  selector: 'intra-regional-activity-reports',
  templateUrl: './intra-regional-activity-reports.component.html',
    styleUrls: ['../region-reports.component.scss']
})
export class IntraRegionalActivityReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/IntraRegionalActivityReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Irar>();
    ColumnMode = ColumnMode;
    constructor(private irarService: IrarService,
                private paginationResponse: PaginationResponse<Irar>) {
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
        this.irarService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt16.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
