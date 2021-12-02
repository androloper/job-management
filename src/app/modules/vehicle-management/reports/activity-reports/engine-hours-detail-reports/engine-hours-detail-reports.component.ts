import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../../../services/pagination-response";
import {Ehdr} from "./models/ehdr";
import {EhdrService} from "./services/ehdr.service";

@Component({
  selector: 'engine-hours-detail-reports',
  templateUrl: './engine-hours-detail-reports.component.html',
    styleUrls: ['../activity-reports.component.scss']
})
export class EngineHoursDetailReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/EngineHoursDetailReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Ehdr>();
    ColumnMode = ColumnMode;
    constructor(private ehdrService: EhdrService,
                private paginationResponse: PaginationResponse<Ehdr>) {
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
    //    this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`).subscribe((data:PaginationResponse<any>) => {
        this.ehdrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
            setTimeout(async () => {
                    this.loadingIndicator = false;
                $('#ngx-dt11.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }
}
