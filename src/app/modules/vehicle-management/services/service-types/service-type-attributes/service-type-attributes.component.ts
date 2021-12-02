import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../../environments/environment";
import {Page} from "../../../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {ServiceTypeAttributes} from "../models/service-type-attributes";
import {ServiceTypeAttributesService} from "../services/service-type-attributes.service";

declare let alertify: any;
declare const $: any;
@Component({
  selector: 'service-type-attributes',
  templateUrl: './service-type-attributes.component.html',
  styleUrls: ['./service-type-attributes.component.scss']
})
export class ServiceTypeAttributesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/ServiceTypeAttributes`;
    loadingIndicator = true;
    page = new Page();
    serviceTypeAttributes = new Array<ServiceTypeAttributes>();
    ColumnMode = ColumnMode;
    addServiceTypeAttributesForm: FormGroup;
    editServiceTypeAttributesForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<ServiceTypeAttributes>,
                private httpService: HttpClient,
                private formBuilder: FormBuilder,
                private serviceTypeAttributesService: ServiceTypeAttributesService) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addServiceTypeAttributesForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            Value: ['', [Validators.required]],
            ServiceTypeId: ['',[Validators.required]],
            ServiceType: [''],
        });
        this.editServiceTypeAttributesForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            Value: ['', [Validators.required]],
            ServiceTypeId: ['',[Validators.required]],
            ServiceType: [''],
        });
    }
    addServiceTypeAttribute() {
        const obj = {
            id: this.addServiceTypeAttributesForm.value.Id,
            name: this.addServiceTypeAttributesForm.value.Name,
            value: this.addServiceTypeAttributesForm.value.Value,
            serviceTypeId: this.addServiceTypeAttributesForm.value.ServiceTypeId,
            serviceType: this.addServiceTypeAttributesForm.value.ServiceType,
        };
        this.serviceTypeAttributesService.insert(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#add_service_type_attr').modal('hide');
        alertify.success("New service type attribute is added.");
    }
    editServiceTypeAttribute() {
        const obj = {
            id: this.editServiceTypeAttributesForm.value.EditId,
            name: this.editServiceTypeAttributesForm.value.Name,
            value: this.editServiceTypeAttributesForm.value.Value,
            serviceTypeId: this.editServiceTypeAttributesForm.value.ServiceTypeId,
            serviceType: this.editServiceTypeAttributesForm.value.ServiceType,
        };
        this.serviceTypeAttributesService.update(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#edit_service_type_attr').modal('hide');
        alertify.warning("Chosen service type attribute is updated.");
    }
    setServiceTypeAttribute(value) {
        this.editId = value;
        const index = this.serviceTypeAttributes.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.serviceTypeAttributes[index];
        this.editServiceTypeAttributesForm.get('EditId').setValue(toSetValues.id);
        this.editServiceTypeAttributesForm.get('Name').setValue(toSetValues.name);
        this.editServiceTypeAttributesForm.get('Value').setValue(toSetValues.value);
        this.editServiceTypeAttributesForm.get('ServiceTypeId').setValue(toSetValues.serviceTypeId);
        this.editServiceTypeAttributesForm.get('ServiceType').setValue(toSetValues.serviceType);
    }
    deleteServiceTypeAttribute() {
        // this.serviceTypeAttributesService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() => {
        });
        this.setPage({offset: 0});
        $('#delete_service_type_attr').hide();
        alertify.error("Chosen service type attribute is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.serviceTypeAttributesService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt53.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.serviceTypeAttributes = data.data;
            });
    }
}
