import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../../../services/pagination-response";
import {Adr} from "./model/adr";
import {AdrService} from "./services/adr.service";

@Component({
  selector: 'activity-detail-reports',
  templateUrl: './activity-detail-reports.component.html',
    styleUrls: ['../activity-reports.component.scss']
})
export class ActivityDetailReportsComponent implements OnInit {
    private apiUrl=`${environment.vehicleTrackingUrl}/ActivityDetailReports`;
    loadingIndicator = true;
    page = new Page();
    reports = new Array<Adr>();
    ColumnMode = ColumnMode;
  constructor(private adrService: AdrService,
              private paginationResponse: PaginationResponse<Adr>) {
      this.page.pageNumber = 1;
      this.page.size = 10;
  }

  ngOnInit(): void {
      this.setPage({offset:0});
  }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1);
        //this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`).subscribe((data:PaginationResponse<any>) => {
        this.adrService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl).subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt10.datatable-scroll').width('100%');
                }, 2000);
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.reports = data.data;
            });
    }

    // getListPaginationByVehicleId(pageInfo){
    //     this.page.pageNumber = (pageInfo.offset + 1);
    //     this.httpService.get(`${this.apiUrl}/GetListPaginationByVehicleId?VehicleId=${this.vehicleId}&PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`)
    //         .subscribe((data:PaginationResponse<any>) => {
    //             console.log(data['data']);
    //             setTimeout(async () => {
    //                 this.loadingIndicator = false;
    //             }, 2000);
    //             this.page.pageNumber = data.pageNumber - 1;
    //             this.page.size = data.pageSize;
    //             this.page.totalPages = data.totalPages;
    //             this.page.totalElements = data.totalRecords;
    //             this.specificReport = data.data;
    //             this.reports = this.specificReport;
    //         });
    // }

    // setPage2(pageInfo) {
    //     this.vehicleId = this.sharedService.getId();
    //     console.log(this.vehicleId);
    //     this.page.pageNumber = (pageInfo.offset + 1);
    //     if(this.vehicleId===undefined){
    //     this.httpService.get(`${this.apiUrl}/GetListPagination?PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`)
    //         .subscribe((data:PaginationResponse<any>) => {
    //             setTimeout(async () => {
    //                 this.loadingIndicator = false;
    //             }, 2000);
    //             this.page.pageNumber = data.pageNumber - 1;
    //             this.page.size = data.pageSize;
    //             this.page.totalPages = data.totalPages;
    //             this.page.totalElements = data.totalRecords;
    //             this.mainReport = data.data;
    //             this.reports = this.mainReport;
    //         });
    //     }
    //     else {
    //         this.httpService.get(`${this.apiUrl}/GetListPaginationByVehicleId?VehicleId=${this.vehicleId}&PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`)
    //             .subscribe((data:PaginationResponse<any>) => {
    //                 setTimeout(async () => {
    //                     this.loadingIndicator = false;
    //                 }, 2000);
    //                 this.page.pageNumber = data.pageNumber - 1;
    //                 this.page.size = data.pageSize;
    //                 this.page.totalPages = data.totalPages;
    //                 this.page.totalElements = data.totalRecords;
    //                 this.specificReport = data.data;
    //                 this.reports = this.specificReport;
    //             });
    //     }
    // }
}
