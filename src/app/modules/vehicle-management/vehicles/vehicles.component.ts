import {Component, OnInit} from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "./models/vehicle";
import {VehicleService} from "./services/vehicle.service";

declare let alertify: any;
declare const $: any;
@Component({
    selector       : 'vehicles',
    providers: [VehicleService],
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/Vehicles`;
    loadingIndicator = true;
    page = new Page();
    vehicles = new Array<Vehicle>();
    ColumnMode = ColumnMode;
    addVehicleForm: FormGroup;
    editVehicleForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Vehicle>,
                private httpService: HttpClient,
                private vehicleService: VehicleService,
                private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addVehicleForm = this.formBuilder.group({
            Id: [''],
            Make: ['', [Validators.required]],
            Model: ['',[Validators.required]],
            Plate: ['',[Validators.required]],
            Color: ['',[Validators.required]],
            Km: ['',[Validators.required]],
            UserId: ['',[Validators.required]],
            SerialNumber: ['',[Validators.required]],
            DriverName: [''],
            GroupId: ['',[Validators.required]],
            Group: [''],
            User: [''],
        });
        this.editVehicleForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Make: ['', [Validators.required]],
            Model: ['',[Validators.required]],
            Plate: ['',[Validators.required]],
            Color: ['',[Validators.required]],
            Km: ['',[Validators.required]],
            UserId: ['',[Validators.required]],
            SerialNumber: ['',[Validators.required]],
            DriverName: [''],
            GroupId: ['',[Validators.required]],
            Group: [''],
            User: [''],
        });
    }
    addVehicle() {
        const obj = {
            id: this.addVehicleForm.value.Id,
            make: this.addVehicleForm.value.Make,
            model: this.addVehicleForm.value.Model,
            plate: this.addVehicleForm.value.Plate,
            color: this.addVehicleForm.value.Color,
            km: this.addVehicleForm.value.Km,
            userId: this.addVehicleForm.value.UserId,
            serialNumber: this.addVehicleForm.value.SerialNumber,
            driverName: this.addVehicleForm.value.DriverName,
            groupId: this.addVehicleForm.value.GroupId,
            group: this.addVehicleForm.value.Group,
            user: this.addVehicleForm.value.User,
        };
        this.vehicleService.insert(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#add_vehicle').modal('hide');
        alertify.success("New Vehicle is added.");
    }
    editVehicle() {
        const obj = {
            id: this.editVehicleForm.value.EditId,
            make: this.editVehicleForm.value.Make,
            model: this.editVehicleForm.value.Model,
            plate: this.editVehicleForm.value.Plate,
            color: this.editVehicleForm.value.Color,
            km: this.editVehicleForm.value.Km,
            userId: this.editVehicleForm.value.UserId,
            serialNumber: this.editVehicleForm.value.SerialNumber,
            driverName: this.editVehicleForm.value.DriverName,
            groupId: this.editVehicleForm.value.GroupId,
            group: this.editVehicleForm.value.Group,
            user: this.editVehicleForm.value.User,
        };
        this.vehicleService.update(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#edit_vehicle').modal('hide');
        alertify.warning("Chosen Vehicle is updated.");
    }
    setVehicle(value) {
        this.editId = value;
        const index = this.vehicles.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.vehicles[index];
        this.editVehicleForm.get('EditId').setValue(toSetValues.id);
        this.editVehicleForm.get('Make').setValue(toSetValues.make);
        this.editVehicleForm.get('Model').setValue(toSetValues.model);
        this.editVehicleForm.get('Plate').setValue(toSetValues.plate);
        this.editVehicleForm.get('Color').setValue(toSetValues.color);
        this.editVehicleForm.get('Km').setValue(toSetValues.km);
        this.editVehicleForm.get('UserId').setValue(toSetValues.userId);
        this.editVehicleForm.get('SerialNumber').setValue(toSetValues.serialNumber);
        this.editVehicleForm.get('DriverName').setValue(toSetValues.driverName);
        this.editVehicleForm.get('GroupId').setValue(toSetValues.groupId);
        this.editVehicleForm.get('Group').setValue(toSetValues.group);
        this.editVehicleForm.get('User').setValue(toSetValues.user);
    }
    deleteVehicle() {
       // this.vehicleService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() =>{});
        this.setPage({offset:0});
        $('#delete_vehicle').hide();
        alertify.error("Chosen Vehicle is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.vehicleService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt9.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.vehicles = data.data;
            });
    }
}
