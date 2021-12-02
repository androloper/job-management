import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../services/page";
import {PaginationResponse} from "../../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {ServiceTypes} from "./models/service-types";
import {ServiceTypesService} from "./services/service-types.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare let alertify: any;
declare const $: any;
@Component({
  selector: 'service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.scss']
})
export class ServiceTypesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/ServiceTypes`;
    loadingIndicator = true;
    page = new Page();
    serviceTypes = new Array<ServiceTypes>();
    ColumnMode = ColumnMode;
    addServiceTypesForm: FormGroup;
    editServiceTypesForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<ServiceTypes>,
                private httpService: HttpClient,
                private formBuilder: FormBuilder,
                private serviceTypesService: ServiceTypesService) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addServiceTypesForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            ServiceTypeAttributes: ['',[Validators.required]],
        });
        this.editServiceTypesForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            ServiceTypeAttributes: ['',[Validators.required]],
        });
    }
    addServiceType() {
        const obj = {
            id: this.addServiceTypesForm.value.Id,
            name: this.addServiceTypesForm.value.Name,
            serviceTypeAttributes: this.addServiceTypesForm.value.ServiceTypeAttributes,
        };
        this.serviceTypesService.insert(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#add_service_type').modal('hide');
        alertify.success("New service type is added.");
    }
    editServiceType() {
        const obj = {
            id: this.editServiceTypesForm.value.EditId,
            name: this.editServiceTypesForm.value.Name,
            serviceTypeAttributes: this.editServiceTypesForm.value.ServiceTypeAttributes,
        };
        this.serviceTypesService.update(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#edit_service_type').modal('hide');
        alertify.warning("Chosen service type is updated.");
    }
    setServiceType(value) {
        this.editId = value;
        const index = this.serviceTypes.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.serviceTypes[index];
        this.editServiceTypesForm.get('EditId').setValue(toSetValues.id);
        this.editServiceTypesForm.get('Name').setValue(toSetValues.name);
        this.editServiceTypesForm.get('ServiceTypeAttributes').setValue(toSetValues.serviceTypeAttributes);
    }
    deleteServiceType() {
        // this.vehicleService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() => {
        });
        this.setPage({offset: 0});
        $('#delete_service_type').hide();
        alertify.error("Chosen service type is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.serviceTypesService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt53.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.serviceTypes = data.data;
            });
    }
}
