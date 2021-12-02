import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../services/page";
import {PaginationResponse} from "../../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {AllServices} from "./models/all-services";
import {AllServicesService} from "./services/all-services.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare let alertify: any;
declare const $: any;
@Component({
  selector: 'all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/VehicleServices`;
    loadingIndicator = true;
    page = new Page();
    services = new Array<AllServices>();
    ColumnMode = ColumnMode;
    addServiceForm: FormGroup;
    editServiceForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<AllServices>,
                private httpService: HttpClient,
                private formBuilder: FormBuilder,
                private allServicesService: AllServicesService) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addServiceForm = this.formBuilder.group({
            Id: [''],
            CreatedDate: [''],
            Description: ['',[Validators.required]],
            VehicleId: ['',[Validators.required]],
            Vehicle: [''],
            ServiceCompanyId: ['',[Validators.required]],
            ServiceCompany: [''],
            ServiceTypeId: ['',[Validators.required]],
            ServiceType: [''],
        });
        this.editServiceForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            CreatedDate: [''],
            Description: ['',[Validators.required]],
            VehicleId: ['',[Validators.required]],
            Vehicle: [''],
            ServiceCompanyId: ['',[Validators.required]],
            ServiceCompany: [''],
            ServiceTypeId: ['',[Validators.required]],
            ServiceType: [''],
        });
    }
    addService() {
        const obj = {
            id: this.addServiceForm.value.Id,
            createdDate: this.addServiceForm.value.CreatedDate,
            description: this.addServiceForm.value.Description,
            vehicleId: this.addServiceForm.value.VehicleId,
            vehicle: this.addServiceForm.value.Vehicle,
            serviceCompanyId: this.addServiceForm.value.ServiceCompanyId,
            serviceCompany: this.addServiceForm.value.ServiceCompany,
            serviceTypeId: this.addServiceForm.value.ServiceTypeId,
            serviceType: this.addServiceForm.value.ServiceType,
        };
        this.allServicesService.insert(obj, this.apiUrl).subscribe((data) =>{console.log(data)});
        this.setPage({offset:0});
        $('#add_service').modal('hide');
        alertify.success("New service is added.");
    }
    editService() {
        const obj = {
            id: this.editServiceForm.value.EditId,
            createdDate: this.editServiceForm.value.CreatedDate,
            description: this.editServiceForm.value.Description,
            vehicleId: this.editServiceForm.value.VehicleId,
            vehicle: this.editServiceForm.value.Vehicle,
            serviceCompanyId: this.editServiceForm.value.ServiceCompanyId,
            serviceCompany: this.editServiceForm.value.ServiceCompany,
            serviceTypeId: this.editServiceForm.value.ServiceTypeId,
            serviceType: this.editServiceForm.value.ServiceType,
        };
        this.allServicesService.update(obj, this.apiUrl).subscribe((data) =>{console.log(data)});
        this.setPage({offset:0});
        $('#edit_service').modal('hide');
        alertify.warning("Chosen service is updated.");
    }
    setService(value) {
        this.editId = value;
        const index = this.services.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.services[index];
        this.editServiceForm.get('EditId').setValue(toSetValues.id);
        this.editServiceForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editServiceForm.get('Description').setValue(toSetValues.description);
        this.editServiceForm.get('VehicleId').setValue(toSetValues.vehicleId);
        this.editServiceForm.get('Vehicle').setValue(toSetValues.vehicle);
        this.editServiceForm.get('ServiceCompanyId').setValue(toSetValues.serviceCompanyId);
        this.editServiceForm.get('ServiceCompany').setValue(toSetValues.serviceCompany);
        this.editServiceForm.get('ServiceTypeId').setValue(toSetValues.serviceTypeId);
        this.editServiceForm.get('ServiceType').setValue(toSetValues.serviceType);
    }
    deleteService() {
        // this.allServicesService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() =>{});
        this.setPage({offset:0});
        $('#delete_service').hide();
        alertify.error("Chosen service is deleted.");
    }

    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.allServicesService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt51.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.services = data.data;
            });
    }
}
