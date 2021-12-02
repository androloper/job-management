import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "./services/attendance.service";
import {HttpClient} from "@angular/common/http";
import {PaginationResponse} from "../../services/pagination-response";
import {Attendance} from "./models/attendance";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import { ColumnMode } from "@swimlane/ngx-datatable";
@Component({
    selector       : 'attendance',
    templateUrl    : './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
    private apiUrl: string = `${environment.taskManagementUrl}/Attendances`;
    loadingIndicator = true;
    page = new Page();
    attendances = new Array<Attendance>()
    ColumnMode = ColumnMode;
    tempId: any;
    updateId: any;
    constructor(private attendanceService:AttendanceService,
                private httpService:HttpClient,
                private paginationResponse: PaginationResponse<Attendance>,) {
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
        this.attendanceService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                console.log(data);
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt63.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.attendances = data.data;
            });
    }
}
