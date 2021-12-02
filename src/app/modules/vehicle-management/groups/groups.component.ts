import { Component, OnInit } from '@angular/core';
import {GroupService} from "./services/group.service";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {Group} from "./models/group";
import {ActivatedRoute} from "@angular/router";

declare let alertify: any;
declare const $: any;
@Component({
  selector: 'groups',
  providers: [GroupService],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/Groups`;
    loadingIndicator = true;
    page = new Page();
    page2 = new Page();
    groups = new Array<Group>();
    ColumnMode = ColumnMode;
    addGroupForm: FormGroup;
    editGroupForm: FormGroup;
    vehicles:any;
    groupId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Group>,
                private activatedRoute: ActivatedRoute,
                private httpService: HttpClient,
                private groupService: GroupService,
                private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
        this.page2.pageNumber = 1;
        this.page2.size = 10;
    }

    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addGroupForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            Description: ['',[Validators.required]],
            Vehicles: [''],
        });
        this.editGroupForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            Description: ['',[Validators.required]],
            Vehicles: [''],
        });
    }
    addGroup() {
        const obj = {
            id: this.addGroupForm.value.Id,
            name: this.addGroupForm.value.Name,
            description: this.addGroupForm.value.Description,
            vehicles: this.addGroupForm.value.Vehicles,
        };
        this.groupService.insert(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#add_group').modal('hide');
        alertify.success("New group is added.");
    }
    editGroup() {
        const obj = {
            id: this.editGroupForm.value.EditId,
            name: this.editGroupForm.value.Name,
            description: this.editGroupForm.value.Description,
            vehicles: this.editGroupForm.value.Vehicles,
        };
        this.groupService.update(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#edit_group').modal('hide');
        alertify.warning("Chosen group is updated.");
    }
    setGroup(value) {
        this.editId = value;
        const index = this.groups.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.groups[index];
        this.editGroupForm.get('EditId').setValue(toSetValues.id);
        this.editGroupForm.get('Name').setValue(toSetValues.name);
        this.editGroupForm.get('Description').setValue(toSetValues.description);
        this.editGroupForm.get('Vehicles').setValue(toSetValues.vehicles);
        }
    deleteGroup() {
        //this.groupService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() =>{});
        this.setPage({offset:0});
        $('#delete_group').hide();
        alertify.error("Chosen group is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1);
        this.groupService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt6.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.groups = data.data;
            });
    }
    getByIdWithVehicleListPagination(groupId){
        // this.page2.pageNumber = (pageInfo.offset + 1);
        this.httpService.get(`${this.apiUrl}/GetByIdWithVehicleListPagination?Id=${groupId}&PageNumber=${this.page2.pageNumber}&PageSize=${this.page2.size}`)
            .subscribe((data2:PaginationResponse<Group>) => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt7.datatable-scroll').width('100%');
                }, 2000)
                this.vehicles = data2.data['vehicles'];
                // this.page2.pageNumber = data2.pageNumber - 1;
                this.page2.size = data2.pageSize;
                this.page2.totalPages = data2.totalPages;
                this.page2.totalElements = this.vehicles.length;
                //this.page2.totalElements = data2.totalRecords;
            });
    }
}
