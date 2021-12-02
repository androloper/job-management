import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {PaginationResponse} from "../../../../services/pagination-response";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {Avr} from "./models/avr";
import {AvrService} from "./services/avr.service";

@Component({
  selector: 'acceleration-violation-reports',
  templateUrl: './acceleration-violation-reports.component.html',
    styleUrls: ['../violation-reports.component.scss']
})
export class AccelerationViolationReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/AccelerationViolationReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Avr>();
    ColumnMode = ColumnMode;
    constructor(private avrService: AvrService,
                private paginationResponse: PaginationResponse<Avr>) {
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
        this.avrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
            setTimeout(async () => {
                    this.loadingIndicator = false;
                $('#ngx-dt21.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
