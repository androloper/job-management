import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {Device} from "./models/device";
import {DeviceService} from "./services/device.service";

declare let alertify: any;
declare const $: any;
@Component({
  selector: 'devices',
  providers:[DeviceService],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/Devices`;
    loadingIndicator = true;
    page = new Page();
    devices = new Array<Device>();
    ColumnMode = ColumnMode;
    addDeviceForm: FormGroup;
    editDeviceForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Device>,
                private httpService: HttpClient,
                private deviceService: DeviceService,
                private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addDeviceForm = this.formBuilder.group({
            Id: [''],
            SerialNumber: ['', [Validators.required]],
        });
        this.editDeviceForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            SerialNumber: ['',[Validators.required]],

        });
    }
    addDevice() {
        const obj = {
            id: this.addDeviceForm.value.Id,
            serialNumber: this.addDeviceForm.value.SerialNumber,
        };
        this.deviceService.insert(obj, this.apiUrl).subscribe((data) => {console.log(data)});
        this.setPage({offset:0});
        $('#add_device').modal('hide');
        alertify.success("New Device is added.");
    }
    editDevice() {
        const obj = {
            id: this.editDeviceForm.value.EditId,
            serialNumber: this.editDeviceForm.value.SerialNumber,
        };
        this.deviceService.update(obj, this.apiUrl).subscribe((data) => {console.log(data)});
        this.setPage({offset:0});
        $('#edit_device').modal('hide');
        alertify.warning("Chosen Device is updated.");
    }
    setDevice(value) {
        this.editId = value;
        const index = this.devices.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.devices[index];
        this.editDeviceForm.get('EditId').setValue(toSetValues.id);
        this.editDeviceForm.get('SerialNumber').setValue(toSetValues.serialNumber);
    }
    deleteDevice() {
        //this.DeviceService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() =>{});
        this.setPage({offset:0});
        $('#delete_device').hide();
        alertify.error("Chosen Device is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.deviceService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt5.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.devices = data.data;
            });
    }
}
